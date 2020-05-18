import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FirestoreDecksService } from 'src/app/services/firestore/firestore-decks.service';
import { Observable } from 'rxjs';
import { Card } from 'src/app/pojos/card/card';

@Component({
  selector: 'app-game-writing',
  templateUrl: './game-writing.component.html',
  styleUrls: ['./game-writing.component.css']
})
export class GameWritingComponent implements OnInit {

  userID: string;
  deckID: string;
  cardsCollectionObs: Observable<Card[]>;
  cardsCollectionSize: number;
  selectedCardObs: Observable<Card>;
  selectedCard: Card;
  userAnswer: string;
  isAnswered: boolean; // To control UI changes & select 4 new cards
  success: boolean;
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

  checkAnswer() {
    if (this.languagesOrder) this.success = this.userAnswer.toLowerCase() == this.selectedCard.answer.toLowerCase();
    else this.success = this.userAnswer.toLowerCase() == this.selectedCard.question.toLowerCase();
    this.isAnswered = true;
    // Update Firestore DB info
    this._decksService.addAnswered(this.deckID, this.selectedCard, this.userID, this.success);
  }

  newPlay() {
    this.userAnswer = "";
    this.previousLanguagesOrder = this.languagesOrder;
    // Restore control parameters
    this.isAnswered = false;
    this.success = false;
    // Random card choosed as question
    let randomPosition = Math.floor((this.cardsCollectionSize * Math.random()));
    this.cardsCollectionObs.subscribe(cards => {
      this.selectedCardObs = this._decksService.getCardObs(this.deckID, cards[randomPosition].id);
      this.selectedCardObs.subscribe(card => this.selectedCard = card);
    });
  }

  setMyClasses() {
    return {
      "text-danger": this.isAnswered && !this.success,
      "text-success": this.isAnswered && this.success
    }
  }

}
