import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Card } from 'src/app/pojos/card/card';
import { FirestoreDecksService } from 'src/app/services/firestore/firestore-decks.service';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-check-card-list',
  templateUrl: './check-card-list.component.html',
  styleUrls: ['./check-card-list.component.css']
})
export class CheckCardListComponent implements OnInit {

  deckID: string;
  cardsObs: Observable<Card[]>;
  @Input() itemsDisabled: boolean; // To disabled items while parent component is in editing mode
  @Input() unselectItems: boolean; // To unselect all items when user updates/cancel an editing operation (restore selected decks)
  @Output() cardSelectionEmiter = new EventEmitter<[Card, boolean]>();
  @Output() newCardContentEmitter = new EventEmitter<[Card, [string, string]]>();

  constructor(private _decksServise: FirestoreDecksService, private _activatedRoute: ActivatedRoute) {
    this.deckID = _activatedRoute.snapshot.paramMap.get('deckID');
  }

  ngOnInit(): void {
    this.cardsObs = this._decksServise.getCardCollectionObs(this.deckID);
  }

  emitCardSelection(cardAndStatus: [Card, boolean]) {
    this.cardSelectionEmiter.emit(cardAndStatus);
  }

  emitNewCardContent(cardAndNewContent: [Card, [string, string]]) {
    this.newCardContentEmitter.emit(cardAndNewContent);
  }

}
