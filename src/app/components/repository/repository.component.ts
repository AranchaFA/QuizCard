import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Deck } from 'src/app/pojos/deck/deck';
import { FirestoreDecksService } from 'src/app/services/firestore/firestore-decks.service';
import { Card } from 'src/app/pojos/card/card';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-repository',
  templateUrl: './repository.component.html',
  styleUrls: ['./repository.component.css']
})
export class RepositoryComponent implements OnInit {

  userID: string;
  userDecks: Array<Deck>;
  selectedNativeLanguage: string; // Routing parameter
  selectedTargetLanguage: string; // Routing parameter
  inputNativeLanguage: string; // To bind input selection
  inputTargetLanguage: string; // To bind input selection
  selectedDeckID: string;
  selectedDeckObs: Observable<Deck>;
  selectedCards = new Array<Card>();
  isCopying: boolean; // To control when to show userDecks to choose to which one copy selectedCards

  constructor(private _activatedRoute: ActivatedRoute, private _router: Router, private _decksService: FirestoreDecksService) {
    this.userID = this._activatedRoute.snapshot.paramMap.get('userID');
    this.selectedNativeLanguage = this._activatedRoute.snapshot.paramMap.get('nativeLanguage');
    this.selectedTargetLanguage = this._activatedRoute.snapshot.paramMap.get('targetLanguage');
    this.selectedDeckID = this._activatedRoute.snapshot.paramMap.get('deckID');
  }

  ngOnInit(): void {
    if (this.selectedDeckID != null) {
      this.selectedDeckObs = this._decksService.getDeckObs(this.selectedDeckID);
    }
  }

  navigateDeck(deck: Deck) {
    this._router.navigate(['/' + this.userID, 'repository', this.selectedNativeLanguage, this.selectedTargetLanguage, deck.id]);
  }

  changeCardSelection(cardAndStatus: [Card, boolean]) {
    if (cardAndStatus[1]) { // card is selected -> Add to selectedCards array
      this.selectedCards.push(cardAndStatus[0]);
    } else { // card isn't selected -> Remove from selectedCards array
      this.selectedCards.splice(this.selectedCards.findIndex(card => card.id == cardAndStatus[0].id), 1);
    }
  }

  copySelectedCards(deckDestiny: Deck) {
    // ADD SELECTED CARDS TO USER CHOSEN DECK

    this.selectedCards = new Array<Card>();
  }

  cancel(){
    this._router.navigate(['/' + this.userID, 'repository', this.selectedNativeLanguage, this.selectedTargetLanguage]);
  }
}
