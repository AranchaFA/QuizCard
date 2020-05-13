import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { Card } from 'src/app/pojos/card/card';
import { ActivatedRoute } from '@angular/router';
import { FirestoreDecksService } from 'src/app/services/firestore/firestore-decks.service';

@Component({
  selector: 'app-game-training',
  templateUrl: './game-training.component.html',
  styleUrls: ['./game-training.component.css']
})
export class GameTrainingComponent implements OnInit {

  userID: string;
  deckID: string;
  cardsCollectionObs: Observable<Card[]>;
  cardsCollectionSize: number;
  selectedCardObs: Observable<Card>;
  selectedCard: Card;
  isAnswered: boolean; // To control UI changes & select 4 new cards
  @Input() languagesOrder: boolean; // To invert languages order (question-answer)
  previousLanguagesOrder: boolean; // To control when languagesOrder has changed, to execute newPlay()

  constructor(private _activatedRoute: ActivatedRoute, private _decksService: FirestoreDecksService) {
    this.userID = _activatedRoute.snapshot.paramMap.get('userID');
    this.deckID = _activatedRoute.snapshot.paramMap.get('deckID');
  }

  ngOnInit(): void {
    this.cardsCollectionObs = this._decksService.getCardCollectionObs(this.deckID);
    this.cardsCollectionObs.subscribe(cards => { this.cardsCollectionSize = cards.length; this.newPlay() });
  }

  ngOnChanges(): void {
    if (this.previousLanguagesOrder != this.languagesOrder) this.newPlay(); // Change cards if languagesOrder is changed
  }

  newPlay() {
    this.previousLanguagesOrder = this.languagesOrder;
    this.isAnswered = false;
    // Random card choosed as question
    let randomPosition = Math.floor((this.cardsCollectionSize * Math.random()));
    this.cardsCollectionObs.subscribe(cards => {
      this.selectedCardObs = this._decksService.getCardObs(this.deckID, cards[randomPosition].id);
      this.selectedCardObs.subscribe(card => this.selectedCard = card);
    });
  }

}
