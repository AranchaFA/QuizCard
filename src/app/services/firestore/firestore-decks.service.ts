import { Injectable } from '@angular/core';
// Firebase Firestore imports
import * as firebase from 'firebase';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore';
// POJOs imports
import { Deck } from 'src/app/pojos/deck/deck';
import { Card } from 'src/app/pojos/card/card';
import { Statistic } from 'src/app/pojos/statistic/statistic';
// ReactJS
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirestoreDecksService {

  ////////////////
  // ATTRIBUTES //
  ////////////////
  // To manipulate decks collection
  private decksCollection: AngularFirestoreCollection<Deck>;
  // Observables
  private decksCollectionObs: Observable<Deck[]>;
  private cardsCollectionObs: Observable<Card[]>;
  private statisticsCollectionObs: Observable<Statistic[]>;
  private deckObs: Observable<Deck>;
  private cardObs: Observable<Card>;


  /////////////
  // METHODS //
  /////////////
  constructor(private _firestoreService: AngularFirestore) {
    this.decksCollection = _firestoreService.collection<Deck>('decks');
  }

  // get OBSERVABLES
  getDeckCollectionObs(userID: string): Observable<Deck[]> {
    this.decksCollectionObs = this._firestoreService.collection<Deck>
      ('decks', ref => ref.where('userIDs', "array-contains", userID)).valueChanges();
    return this.decksCollectionObs;
  }

  getDecksByLanguagesObs(nativeLanguage: string, targetLanguage: string): Observable<Deck[]> {
    this.decksCollectionObs = this._firestoreService.collection<Deck>('decks',
      ref => ref.where('native_language', '==', nativeLanguage).where('target_language', '==', targetLanguage)).valueChanges();
    return this.decksCollectionObs;
  }

  getDeckObs(deckID: string): Observable<Deck> {
    this.deckObs = this._firestoreService.collection<Deck>('decks').doc<Deck>(deckID).valueChanges();
    return this.deckObs;
  }

  getCardCollectionObs(deckID: string): Observable<Card[]> {
    this.cardsCollectionObs = this.decksCollection.doc<Deck>(deckID).collection<Card>('cards').valueChanges();
    return this.cardsCollectionObs;
  }

  getCardObs(deckID: string, cardID: string): Observable<Card> {
    this.cardObs = this.decksCollection.doc<Deck>(deckID).collection<Card>('cards').doc<Card>(cardID).valueChanges();
    return this.cardObs;
  }

  getStatisticCollectionObs(deckID: string, cardID?: string): Observable<Statistic[]> {
    if (cardID) { // Statistics collection of a card
      this.statisticsCollectionObs = this.decksCollection.doc<Deck>(deckID).collection<Card>('cards')
        .doc<Card>(cardID).collection<Statistic>('statistics').valueChanges();
    } else { // Statistics collection of a deck
      this.statisticsCollectionObs = this.decksCollection.doc<Deck>(deckID).collection<Statistic>('statistics').valueChanges();
    }
    return this.statisticsCollectionObs;
  }

  getStatisticObs(deckID: string, userID: string, cardID?: string): Observable<Statistic> {
    if (cardID) { // Uer statistic of a card
      return this.decksCollection.doc<Deck>(deckID).collection<Card>('cards')
        .doc<Card>(cardID).collection<Statistic>('statistics').doc<Statistic>(userID).valueChanges();
    } else { // User statistics of a deck
      return this.decksCollection.doc<Deck>(deckID).collection<Statistic>('statistics')
        .doc<Statistic>(userID).valueChanges();
    }
  }


  //////////////////
  // ADD ELEMENTS //
  //////////////////
  // (We must initialize simple fields and sub-collections separately)

  /**
   * To create a new deck.
   * @param name New Deck's name
   * @param native_language Native language
   * @param target_language Language to study
   * @param userID ID of user who creates the deck
   */
  addDeck(name: string, native_language: string, target_language: string, userID: string) {
    // Add simple deck's fields (sub-collections must be persisted separately)
    let newID = this._firestoreService.createId();
    let newDeckDocument = this.decksCollection.doc<Deck>(newID); // Create new document with generated ID
    let newDeck = new Deck();
    newDeck.initAttributes(newID, name, native_language, target_language, [userID]);
    newDeckDocument.set(Object.assign({}, newDeck));
    // Initialize statistics sub-collection (we don't have to initialize cards collection, it will be empty)
    this.initializeStatisticsCollection(newDeckDocument, [userID]);
  }

  /**
   * To add a new card to a deck.
   * @param deck Deck to wich we will add the new card
   * @param question Card question (in native language)
   * @param answer Card answer (in target language)
   */
  addCard(deck: Deck, question: string, answer: string) {
    // Add simple card's fields (sub-collections must be persisted separately)
    let newID = this._firestoreService.createId();
    let newCardDocument = this.decksCollection.doc<Deck>(deck.id).collection<Card>('cards').doc<Card>(newID); // Create new document with generated ID
    let newCard = new Card();
    newCard.initAttributes(newID, question, answer);
    newCardDocument.set(Object.assign({}, newCard));
    // Initialize statistics sub-collection
    this.initializeStatisticsCollection(newCardDocument, deck.userIDs);
    // Add ID to cardIDs array
    this.decksCollection.doc<Deck>(deck.id).update({ cardIDs: firebase.firestore.FieldValue.arrayUnion(newID) });
    // Update deck size (+1)
    this.decksCollection.doc<Deck>(deck.id).update({ size: firebase.firestore.FieldValue.increment(1) });
  }

  /**
   * To add a new user to a deck
   * @param deck Deck to wich we will add the new user
   * @param userID New user's ID
   */
  addUserToDeck(deck: Deck, userID: string) {
    // Update deck totalUsers (+1)
    this.decksCollection.doc<Deck>(deck.id).update({ totalUsers: firebase.firestore.FieldValue.increment(1) });
    // Add to userIDs array
    this.decksCollection.doc<Deck>(deck.id).update({ userIDs: firebase.firestore.FieldValue.arrayUnion(userID) });
    // Add user to deck's statistics collection
    this.addUserToStatisticsCollection(this.decksCollection.doc<Deck>(deck.id).collection<Statistic>('statistics'), userID);
    // Add user to every card's statistics collection
    let cardsCollection = this.decksCollection.doc<Deck>(deck.id).collection<Card>('cards');
    if (deck.cardIDs.length > 0) deck.cardIDs.forEach(cardID =>
      this.addUserToStatisticsCollection(cardsCollection.doc(cardID).collection<Statistic>('statistics'), userID));
  }

  /**
  * To copy some cards from a deck to another one
  * @param deckDestiny Deck we want to copy the cards to
  * @param cards Array with cards we want to copy
  */
  // TypeError: deck.getUsersIDs is not a function on addCard() ?¿
  // It doesn't work!! :(
  copyCards(deckDestiny: Deck, cards: Array<Card>) {
    // Create new cards with answer&question of all selected cards to copy and add them to deckDestiny
    cards.forEach(card => this.addCard(deckDestiny, card.question, card.answer));
  }

  // AUXILIAR METHODS to add
  /**
   * Add a user to an 'statistics' collection from both a deck and a card (therefore receives as parameter
   * an AngularFirebaseCollection, not a card ID or a deck ID) (Auxiliar method of addUserToDeck())
   * @param statisticsCollection AngularFirestoreCollection of statistics to which we will add the new user
   * @param userID New user's ID
   */
  addUserToStatisticsCollection(statisticsCollection: AngularFirestoreCollection, userID: string): void {
    let statistic = new Statistic();
    statistic.initAttributes(userID);
    statisticsCollection.doc<Statistic>(userID).set(Object.assign({}, statistic));
  }

  /**
   * Initilize and create initial content of users statistics subcollection (their initial 'values' are 0)
   * (Auxiliar method of addDeck() and addCard())
   * @param firestoreDocument AngularFirestoreDocument of the card/deck whose statistics will initialize
   * @param usersIDs Array with all user's IDs from whom we will take statistics
   */
  initializeStatisticsCollection(firestoreDocument: AngularFirestoreDocument, usersIDs: Array<string>): void {
    usersIDs.forEach(userID => {
      let statistic = new Statistic();
      statistic.initAttributes(userID);
      firestoreDocument.collection<Statistic>('statistics').doc(userID).set(Object.assign({}, statistic));
    });
  }


  /////////////////////
  // REMOVE ELEMENTS //
  /////////////////////
  // (We must remove their sub-collections CONTENT separately, collections themself aren't removed,
  // they only stays empty! But its reference still exists on DB. To delete it we should implement Firebase Functions)

  /**
   * Remove a card from a deck (this card with its user statistics sub-collection)
   * @param deck Deck to which the card we want to remove belongs 
   * @param card Card we want to remove
   */
  removeCard(deck: Deck, cardID: string) {
    if (cardID && deck) {
      // Update deck size (-1)
      this.decksCollection.doc<Deck>(deck.id).update({ size: firebase.firestore.FieldValue.increment(-1) });
      // Remove ID from cardIDs array
      this.decksCollection.doc<Deck>(deck.id).update({ cardIDs: firebase.firestore.FieldValue.arrayRemove(cardID) });
      // Remove all user's statistics documents
      deck.userIDs.forEach(userID => this.decksCollection.doc<Deck>(deck.id).collection<Card>('cards')
        .doc<Card>(cardID).collection<Statistic>('statistics').doc<Statistic>(userID).delete());
      // Remove card document itsefl
      this.decksCollection.doc<Deck>(deck.id).collection<Card>('cards').doc<Card>(cardID).delete();
    }
  }

  /**
   * Temove a user from a deck (update statistics of the deck and of all its cards to remove the user from them)
   * @param deck deck from which we want to remove the user
   * @param userID id of the user we want to remove from the deck
   */
  removeUser(deck: Deck, userID: string, ) {
    if (deck && userID) {
      // If deck has only one user we will remove the deck from DB definitely
      if (deck.totalUsers == 1) this.removeDeck(deck);
      else {
        // Update deck totalUsers (-1)
        this.decksCollection.doc<Deck>(deck.id).update({ totalUsers: firebase.firestore.FieldValue.increment(-1) });
        // Remove from userIDs array
        this.decksCollection.doc<Deck>(deck.id).update({ userIDs: firebase.firestore.FieldValue.arrayRemove(userID) });
        // Remove user statistics documents from every card
        if (deck.cardIDs.length > 0) deck.cardIDs.forEach(cardID => this.decksCollection.doc<Deck>(deck.id)
          .collection<Card>('cards').doc<Card>(cardID).collection<Statistic>('statistics').doc<Statistic>(userID).delete());
        // Remove user's statistics document from deck
        this.decksCollection.doc<Deck>(deck.id).collection<Statistic>('statistics').doc<Statistic>(userID).delete();
      }
    }
  }

  // AUXILIAR METHODS
  /**
   * Remove deck's document and every document of its sub-collections (documents of all cards, and the statistics of the deck and of all its cards)
   * (Auxiliar method of removeUser()).
   * @param deck deck we want to remove
   */
  removeDeck(deck: Deck) {
    if (deck) {
      // Remove all its cards' documents 
      deck.cardIDs.forEach(cardID => this.removeCard(deck, cardID));
      // Remove all its statistics' documents
      deck.userIDs.forEach(userID => this.decksCollection.doc<Deck>(deck.id).collection<Statistic>('statistics').doc<Statistic>(userID).delete());
      // Remove deck's document itself
      this.decksCollection.doc<Deck>(deck.id).delete();
    }
  }


  /////////////////////
  // UPDATE ELEMENTS //
  /////////////////////
  /**
   * To update basic information of a deck (name, languages or both of them)
   * @param deck Deck to update
   * @param name New name (optional)
   */
  updateDeck(deck: Deck, name: string) {
    this.decksCollection.doc<Deck>(deck.id).update({ 'name': name });
  }

  /**
   * To update basic information of a card (question, answer or both of them)
   * @param card Card to modify
   * @param deck Deck to wich the card belongs
   * @param question New question (optional)
   * @param answer New answer (optional)
   */
  updateCard(card: Card, deckID: string, question?: string, answer?: string) {
    if (question) card.question = question;
    if (answer) card.answer = answer;
    this.decksCollection.doc<Deck>(deckID).collection<Card>('cards').doc<Card>(card.id).update(Object.assign({}, card));
  }

  /**
   * To update counters when a user answers a question
   * @param deck Deck to wich question card belongs
   * @param card Card whose question has been answered
   * @param userID User's ID who has answered the question
   * @param success True if user chose the right answer, false in any other case
   */
  addAnswered(deckID: string, card: Card, userID: string, success: boolean) {
    // Update deck's statistics
    this.incrementStatistics(this.decksCollection.doc<Deck>(deckID).collection<Statistic>('statistics')
      .doc<Statistic>(userID), success);
    // Update card's statistics
    this.incrementStatistics(this.decksCollection.doc<Deck>(deckID).collection<Card>('cards')
      .doc<Card>(card.id).collection<Statistic>('statistics').doc<Statistic>(userID), success);
  }

  // AUXILIAR METHODS
  /**
   * To increase counters of a Statistic document (auxiliar method of addAnswered()).
   * @param statisticDocument Document of the statistic we will update
   * @param success True if user chose the right answer, false in any other case
   */
  incrementStatistics(statisticDocument: AngularFirestoreDocument, success: boolean) {
    statisticDocument.update({ answered: firebase.firestore.FieldValue.increment(1) });
    if (success) statisticDocument.update({ success: firebase.firestore.FieldValue.increment(1) });
  }


}
