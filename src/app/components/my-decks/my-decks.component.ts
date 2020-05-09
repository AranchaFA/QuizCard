import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FirestoreDecksService } from 'src/app/services/firestore/firestore-decks.service';
import { Deck } from 'src/app/pojos/deck/deck';
import { Card } from 'src/app/pojos/card/card';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-my-decks',
  templateUrl: './my-decks.component.html',
  styleUrls: ['./my-decks.component.css']
})
export class MyDecksComponent implements OnInit {

  userID: string;
  deckToShowID: string; // Route parameter
  deckToShowObs: Observable<Deck>; // To show cards of a selected deck
  selectedDeck: Deck; // To addNewCard/inviteNewUser
  selectedDecks: Array<Deck>;
  selectedCards: Card[];
  isEditing: boolean = false; // To disabled list items while user is editing 
  updateConfirmed: boolean; // To update names on DB if user click Update instead of Cancel
  isAdding: boolean;
  addingConfirmed: boolean;
  isInviting: boolean;

  constructor(private _decksService: FirestoreDecksService, private _activatedRoute: ActivatedRoute, private _router: Router) {
    this.userID = this._activatedRoute.snapshot.paramMap.get('userID');
    this.deckToShowID = this._activatedRoute.snapshot.paramMap.get('deckID');
    this.restoreValues();
  }

  ngOnInit(): void {
    if (this.deckToShowID) {
      this.deckToShowObs = this._decksService.getDeckObs(this.deckToShowID);
      this.deckToShowObs.subscribe(deck => this.selectedDeck = deck);
    }
  }

  /**
   * To show cards of selected deck from the list component
   * @param deck Deck selected to see it cards
   */
  showCards(deck: Deck) {
    this._router.navigate(['/' + this.userID, 'myDecks', deck.id]); // Parent will must navigate to this URL
  }

  changeDeckSelection(deckAndStatus: [Deck, boolean]) {
    if (deckAndStatus[1]) this.selectedDecks.push(deckAndStatus[0]); // deck is selected -> Add 
    else this.selectedDecks.splice(this.selectedDecks.findIndex(deck => deck.id == deckAndStatus[0].id), 1); // deck isn't selected -> Remove 
  }

  changeCardSelection(cardAndStatus: [Card, boolean]) {
    if (cardAndStatus[1]) this.selectedCards.push(cardAndStatus[0]); // Card is selected -> Add 
    else this.selectedCards.splice(this.selectedCards.findIndex(card => card.id == cardAndStatus[0].id), 1); // Card isn't selected -> Remove 
  }

  updateDeckName(deckAndNewName: [Deck, string]) {
    if (this.updateConfirmed) this._decksService.updateDeck(deckAndNewName[0], deckAndNewName[1]);
  }

  updateCardContent(cardAndNewContent: [Card, [string, string]]) {
    if (this.updateConfirmed) this._decksService.updateCard(cardAndNewContent[0], this.deckToShowID, cardAndNewContent[1][0], cardAndNewContent[1][1]);
  }

  addNewDeck(newDeck: Deck) {
    if (this.addingConfirmed) this._decksService.addDeck(newDeck.name, newDeck.native_language, newDeck.target_language, this.userID);
  }

  addNewCard(newCard: Card) {
    if (this.addingConfirmed) this._decksService.addCard(this.selectedDeck, newCard.question, newCard.answer);
  }

  inviteNewUser(newUserEmail: string) {
    if (newUserEmail != 'cancel') { // If user has clicked 'Invite'
      // Search the user with this newUserEmail on DB to obtain his/her userID
      // Add this user (by userID) to selectedToShowDeck with Firestore Service
      // TO TEST COMPONENT
      let newUserID = newUserEmail;
      this._decksService.addUserToDeck(this.selectedDeck, newUserID);
    }
    this.isInviting = false;
  }

  restoreValues() {
    this.selectedDecks = new Array<Deck>();
    this.selectedCards = new Array<Card>();
  }

  /**
   * To change control parameters (isEditing, isAdding, confirmation variables) 
   * and restore selection variables (objects and arrays)
   * @param actionType Specifies what button was clicked by keytype component
   */
  clickAction(actionType: string) {
    switch (actionType) {
      case 'edit':
        this.isEditing = true;
        this.updateConfirmed = false;
        break;
      case 'update':
        this.isEditing = false;
        this.updateConfirmed = true;
        // Restore values (Unselect all items -> It will trigger updateXXX methods!)
        // In this case, we can't emit info throw onDestroy because component isn't destroyed at
        // the end of the operation!! (Unlike what happens with form components to add a deck/card!)
        this.restoreValues();
        break;
      case 'cancel':
        this.isEditing = false;
        this.isAdding = false;
        this.updateConfirmed = false;
        this.addingConfirmed = false;
        // Unselect all items 
        this.restoreValues();
        break;
      case 'remove':
        if (this.selectedDecks.length > 0) this.selectedDecks.forEach(deck => this._decksService.removeUser(deck,this.userID));
        if (this.selectedCards.length > 0) this.selectedCards.forEach(card => this._decksService.removeCard(this.selectedDeck, card.id));
        this.restoreValues();
        break;
      case 'add':
        if (this.isAdding) this.addingConfirmed = true; // Second time clicked
        this.isAdding = !this.isAdding;
        // We don't need restore value, because to add we don't use any variables in this component
        break;
      default:
        console.error('Invalid click action type!');
        break;
    }
    //this.restoreValues(); // It doesn't work correctly if restore values here!
  }
}
