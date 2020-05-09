import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Deck } from 'src/app/pojos/deck/deck';
import { FirestoreDecksService } from 'src/app/services/firestore/firestore-decks.service';
import { Card } from 'src/app/pojos/card/card';
import { Statistic } from 'src/app/pojos/statistic/statistic';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-check-deck-list',
  templateUrl: './check-deck-list.component.html',
  styleUrls: ['./check-deck-list.component.css']
})
export class CheckDeckListComponent implements OnInit {

  userID: string;
  userDecksObs: Observable<Deck[]>;
  @Input() itemsDisabled: boolean; // To disabled items while parent component is in editing mode
  @Input() unselectItems: boolean; // To unselect all items when user updates/cancel an editing operation (restore selected decks)
  @Output() deckSelectionEmiter = new EventEmitter<[Deck, boolean]>();
  @Output() showCardsEmiter = new EventEmitter<Deck>();
  @Output() newDeckNameEmitter = new EventEmitter<[Deck, string]>();

  constructor(private _activatedRoute: ActivatedRoute, private _decksService: FirestoreDecksService) {
    this.userID = this._activatedRoute.snapshot.paramMap.get('userID');
  }

  ngOnInit(): void {
    this.userDecksObs = this._decksService.getDeckCollectionObs(this.userID);
  }

  emitDeckSelection(deckAndStatus: [Deck, boolean]) {
    this.deckSelectionEmiter.emit(deckAndStatus);
  }

  emitDeckShowCards(deck: Deck) {
    this.showCardsEmiter.emit(deck);
  }

  emitNewDeckName(deckAndNewName: [Deck, string]) {
    this.newDeckNameEmitter.emit(deckAndNewName);
  }
}
