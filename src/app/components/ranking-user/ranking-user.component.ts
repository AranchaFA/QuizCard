import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FirestoreDecksService } from 'src/app/services/firestore/firestore-decks.service';
import { Deck } from 'src/app/pojos/deck/deck';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-ranking-user',
  templateUrl: './ranking-user.component.html',
  styleUrls: ['./ranking-user.component.css']
})
export class RankingUserComponent implements OnInit {

  userID: string;
  userDecksObs: Observable<Deck[]>;
  @Output() deckEmitter = new EventEmitter<Deck>();

  constructor(private _activatedRoute: ActivatedRoute, private _decksService: FirestoreDecksService) {
    this.userID = _activatedRoute.snapshot.paramMap.get('userID');
    this.userDecksObs = _decksService.getDeckCollectionObs(this.userID);
  }

  ngOnInit(): void {
  }

  emitDeck(deck: Deck) {
    this.deckEmitter.emit(deck);
  }
}
