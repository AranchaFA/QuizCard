import { Component, OnInit, Input } from '@angular/core';
import { FirestoreDecksService } from 'src/app/services/firestore/firestore-decks.service';
import { Statistic } from 'src/app/pojos/statistic/statistic';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-ranking-group',
  templateUrl: './ranking-group.component.html',
  styleUrls: ['./ranking-group.component.css']
})
export class RankingGroupComponent implements OnInit {

  userID: string;
  deckID: string;
  sortedStatistics: Statistic[];

  constructor(private _decksService: FirestoreDecksService, private _activatedRoute: ActivatedRoute) {
    this.userID = _activatedRoute.snapshot.paramMap.get('userID');
    this.deckID = _activatedRoute.snapshot.paramMap.get('deckID');
  }

  ngOnInit(): void {
    this.sortedStatistics = new Array<Statistic>();
    // All user's statistics sorted from greatest to lowest success ratio
    this._decksService.getStatisticCollectionObs(this.deckID).subscribe
      (statistics => this.sortedStatistics = statistics.sort((s1: Statistic, s2: Statistic) => {
        if (s1.answered == 0 && s2.answered == 0) return 0;
        if (s1.answered == 0) return -1;
        if (s2.answered == 0) return 1;
        return (s1.success / s1.answered) - (s2.success / s2.answered);
      }).reverse());
    /*
    // User statistic at first position (to show it always at first if groups are too large)
    let userIndex = this.sortedStatistics.findIndex(statistic => statistic.userID === this.userID);
    this.sortedStatistics.unshift(this.sortedStatistics.splice(userIndex, 1)[0]);
    */
  }

  /**
   * To assign width proportional to the percentage of correct answers to a 'ranking bar'.
   * @param statistic Statistic we want to represent
   */
  getWidthStyle(statistic: Statistic) {
    let successPercent = statistic.answered > 0 ? Math.floor(statistic.success * 100 / statistic.answered) : 0;
    return { 'width': successPercent + '%' };
  }

  getWidthAria(statistic: Statistic) {
    return statistic.answered > 0 ? Math.floor(statistic.success * 100 / statistic.answered) : 0;
  }
}
