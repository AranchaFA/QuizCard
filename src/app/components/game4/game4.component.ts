import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { FirestoreDecksService } from 'src/app/services/firestore/firestore-decks.service';
import { Card } from 'src/app/pojos/card/card';
import { timer, Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Deck } from 'src/app/pojos/deck/deck';

@Component({
  selector: 'app-game4',
  templateUrl: './game4.component.html',
  styleUrls: ['./game4.component.css']
})
export class Game4Component implements OnInit {

  userID: string;
  cardsCollectionObs: Observable<Card[]>;
  deckID: string;
  isAnswered: boolean; // To control UI changes & select 4 new cards
  correctIndex: number; // Index of cards array
  success: boolean;
  cardsCollectionSize: number;
  cards: Card[] = new Array<Card>(); // 4 random cards from decksService's deck
  @Input() languagesOrder: boolean; // To invert languages order (question-answer)
  previousLanguagesOrder: boolean; // To control when languagesOrder has changed, to execute newPlay()

  constructor(private _activatedRoute: ActivatedRoute, private _router: Router, private _decksService: FirestoreDecksService) {
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
    this.cards = new Array<Card>();
    // Restore control parameters
    this.isAnswered = false;
    this.success = false;
    // Random position of card choosed as question (between 0-3)
    this.correctIndex = Math.floor(Math.random() * 4);

    // 4 random positions of deck's cards array
    let positions: number[] = new Array<number>();
    for (let i = 0; i < 4; i++) {
      let randomNumber = Math.floor((this.cardsCollectionSize * Math.random()));
      if (positions.findIndex(number => number == randomNumber) >= 0) {
        i--; // If number is already choosed, repeat
      } else {
        positions.push(randomNumber);
        this.cardsCollectionObs.subscribe(cards => this.cards.push(cards[randomNumber])); // Push selected card
      }
    }
  }

  checkAnswer(index: number) {
    this.success = (index == this.correctIndex);
    this.isAnswered = true;
    // Update Firestore DB info
    let deck = new Deck();
    deck.id = this.deckID;
    this._decksService.addAnswered(this.deckID, this.cards[this.correctIndex], this.userID, this.success);
    // New play after timeout
    timer(1000).subscribe(() => this.newPlay());

  }

  navigatePlay() {
    this._router.navigate(['/' + this.userID, 'play']);
  }
}
