import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FirestoreDecksService } from 'src/app/services/firestore/firestore-decks.service';
import { Deck } from 'src/app/pojos/deck/deck';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-deck-list',
  templateUrl: './deck-list.component.html',
  styleUrls: ['./deck-list.component.css']
})
export class DeckListComponent implements OnInit {

  userID: string;
  targetLanguage: string;
  nativeLanguage: string;
  decksObs: Observable<Deck[]>;
  @Output() deckEmiter = new EventEmitter<Deck>();

  constructor(private _decksService: FirestoreDecksService, private _activatedRoute: ActivatedRoute) {
    this.userID = _activatedRoute.snapshot.paramMap.get('userID');
    this.targetLanguage = _activatedRoute.snapshot.paramMap.get('targetLanguage');
    this.nativeLanguage = _activatedRoute.snapshot.paramMap.get('nativeLanguage');
  }

  ngOnInit(): void {
    if (this.targetLanguage != null) { // Repository
      this.decksObs = this._decksService.getDecksByLanguagesObs(this.nativeLanguage, this.targetLanguage);
    } else { // My-decks
      this.decksObs = this._decksService.getDeckCollectionObs(this.userID);
    }
  }

  emitDeck(deck: Deck) {
    this.deckEmiter.emit(deck);
  }

}
