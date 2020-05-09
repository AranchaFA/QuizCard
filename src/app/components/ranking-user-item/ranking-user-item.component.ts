import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Deck } from 'src/app/pojos/deck/deck';
import { ActivatedRoute } from '@angular/router';
import { Statistic } from 'src/app/pojos/statistic/statistic';
import { Observable } from 'rxjs';
import { FirestoreDecksService } from 'src/app/services/firestore/firestore-decks.service';

@Component({
  selector: 'app-ranking-user-item',
  templateUrl: './ranking-user-item.component.html',
  styleUrls: ['./ranking-user-item.component.css']
})
export class RankingUserItemComponent implements OnInit {

  userID: string;
  @Input() deck: Deck;
  userStatisticsObs: Observable<Statistic>;
  successPercentage: number;
  isFocused: boolean;
  @Output() deckEmitter = new EventEmitter<Deck>();


  constructor(private _activatedRoute: ActivatedRoute, private _decksService: FirestoreDecksService) {
    this.userID = _activatedRoute.snapshot.paramMap.get('userID');
  }

  ngOnInit(): void {
    this.userStatisticsObs = this._decksService.getStatisticObs(this.deck.id, this.userID);
    this.userStatisticsObs.subscribe(statistic => this.successPercentage = statistic.answered > 0 ? Math.floor(statistic.success * 100 / statistic.answered) : 0);
  }

  emitDeck() {
    this.deckEmitter.emit(this.deck);
  }
}
