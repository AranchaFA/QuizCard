import { Component, OnInit, OnChanges, Output, EventEmitter, Input, ElementRef } from '@angular/core';
import { Deck } from 'src/app/pojos/deck/deck';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { FirestoreDecksService } from 'src/app/services/firestore/firestore-decks.service';
import { Statistic } from 'src/app/pojos/statistic/statistic';

@Component({
  selector: 'app-check-deck-list-item',
  templateUrl: './check-deck-list-item.component.html',
  styleUrls: ['./check-deck-list-item.component.css']
})
export class CheckDeckListItemComponent implements OnInit {

  userID: string;
  userSuccessRatio: number;
  @Input() deck: Deck;
  @Input() isDisabled: boolean; // To disabled item while parent component is in editing mode
  @Input() unselect: boolean; // To unselect item when user updates/cancel an editing operation (restore selected decks)
  @Output() deckSelectionEmiter = new EventEmitter<[Deck, boolean]>();
  @Output() showCardsEmiter = new EventEmitter<Deck>();
  @Output() newNameEmitter = new EventEmitter<[Deck, string]>();
  isSelected: boolean;
  newName: string;

  constructor(private _activatedRoute: ActivatedRoute, private _decksService: FirestoreDecksService) {
    this.isSelected = false;
    this.userID = this._activatedRoute.snapshot.paramMap.get('userID');
  }

  ngOnInit(): void {
    this.newName = this.deck.name;
    this._decksService.getStatisticObs(this.deck.id, this.userID).subscribe(statistic => {
      this.userSuccessRatio = statistic.answered > 0 ? Math.floor(statistic.success * 100 / statistic.answered) : 0;
    });
  }

  ngOnChanges() {
    // To unselect item when parent component restore selected decks array (update/cancel clicked)
    if (this.unselect) {
      this.isSelected = false;
      // IF USER UNSELECT MANUALLY ALL DECKS, ngOnChanges IS EXECUTED TOO!! Not only when update or cancel are clicked
      // First time component is init is executed too. We want emit changes only when user clicks update/cancel 
      // (that's the same time all items are unselected)
      this.emitNewName(); // Emit modifications 
    }
    this.newName = this.deck.name; // TEST IF IT WORKS CORRECTLY WHEN REAL TIME IS USED
  }

  emitDeckSelection() {
    if (!this.isDisabled) {
      this.isSelected = !this.isSelected;
      this.deckSelectionEmiter.emit([this.deck, this.isSelected]);
    }
  }

  emitDeckShowCards() {
    this.showCardsEmiter.emit(this.deck);
  }

  emitNewName() {
    if (this.newName != undefined && this.deck.name != this.newName) {
      this.newNameEmitter.emit([this.deck, this.newName]);
    }
  }

}
