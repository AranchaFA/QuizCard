import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Card } from 'src/app/pojos/card/card';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Statistic } from 'src/app/pojos/statistic/statistic';
import { FirestoreDecksService } from 'src/app/services/firestore/firestore-decks.service';

@Component({
  selector: 'app-check-card-list-item',
  templateUrl: './check-card-list-item.component.html',
  styleUrls: ['./check-card-list-item.component.css']
})
export class CheckCardListItemComponent implements OnInit {

  userID: string;
  deckID: string;
  userSuccessRatio: number;
  @Input() card: Card;
  @Input() index: number;
  @Input() isDisabled: boolean; // To disabled item while parent component is in editing mode
  @Input() unselect: boolean; // To unselect item when user updates/cancel an editing operation (restore selected decks)
  @Output() cardSelectionEmiter = new EventEmitter<[Card, boolean]>();
  @Output() newCardContentEmitter = new EventEmitter<[Card, [string, string]]>(); // [Card [newQuestion,newAnswer]]
  isSelected: boolean;
  newContent: [string, string]; // [newQuestion,newAnswer]

  constructor(private _activatedRoute: ActivatedRoute, private _decksService: FirestoreDecksService) {
    this.isSelected = false;
    this.userID = this._activatedRoute.snapshot.paramMap.get('userID');
    this.deckID = this._activatedRoute.snapshot.paramMap.get('deckID');
  }

  ngOnInit(): void {
    this._decksService.getStatisticObs(this.deckID, this.userID, this.card.id).subscribe(statistic => {
      this.userSuccessRatio = statistic.answered > 0 ? Math.floor(statistic.success * 100 / statistic.answered) : 0;
    });
    //this.newContent = [this.card.question, this.card.answer]; // If user cancels, newContent keeps modified values! -> onChanges
  }

  ngOnChanges() {
    // To unselect item when parent component restore selected cards array (update/cancel clicked)
    if (this.unselect) {
      this.isSelected = false;
      // IF USER UNSELECT MANUALLY ALL DECKS, ngOnChanges IS EXECUTED TOO!! Not only when update or cancel are clicked
      // First time component is init is executed too. We want emit changes only when user clicks update/cancel 
      // (that's the same time unselected=true)
      this.emitNewContent(); // Emit modifications 
    }
    this.newContent = [this.card.question, this.card.answer];
  }

  emitCardSelection() {
    if (!this.isDisabled) {
      this.isSelected = !this.isSelected;
      this.cardSelectionEmiter.emit([this.card, this.isSelected]);
    }
  }

  emitNewContent() {
    if (this.newContent != undefined && (this.card.question != this.newContent[0] || this.card.answer != this.newContent[1])) {
      this.newCardContentEmitter.emit([this.card, this.newContent]);
    }
  }
}
