import { Component, OnInit } from '@angular/core';
import { Deck } from 'src/app/pojos/deck/deck';
import { ActivatedRoute, Router } from '@angular/router';
import { FirestoreDecksService } from 'src/app/services/firestore/firestore-decks.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {

  userID: string;
  selectedDeckID: string;
  selectedDeckObs: Observable<Deck>;

  constructor(private _activatedRoute: ActivatedRoute, private _router: Router, private _decksService: FirestoreDecksService) {
    this.userID = _activatedRoute.snapshot.paramMap.get('userID');
    this.selectedDeckID = _activatedRoute.snapshot.paramMap.get('deckID');
  }

  ngOnInit(): void {
    if (this.selectedDeckID) this.selectedDeckObs = this._decksService.getDeckObs(this.selectedDeckID);
  }

  navigateDeck(deck: Deck) {
    this._router.navigate(['/' + this.userID, 'statistics', deck.id]);
  }
}
