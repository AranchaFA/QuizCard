import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Card } from 'src/app/pojos/card/card';
import { FirestoreDecksService } from 'src/app/services/firestore/firestore-decks.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.css']
})
export class CardListComponent implements OnInit {

  deckID: string;
  cardsObs: Observable<Card[]>;
  @Output() cardSelectionEmiter = new EventEmitter<[Card, boolean]>();

  constructor(private _decksServise: FirestoreDecksService, private _activatedRoute: ActivatedRoute) {
    this.deckID = _activatedRoute.snapshot.paramMap.get('deckID');
  }

  ngOnInit(): void {
    this.cardsObs = this._decksServise.getCardCollectionObs(this.deckID);
  }

  emitCardSelection(cardAndStatus: [Card, boolean]) {
    this.cardSelectionEmiter.emit(cardAndStatus);
  }

}
