import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Card } from 'src/app/pojos/card/card';

@Component({
  selector: 'app-card-list-item',
  templateUrl: './card-list-item.component.html',
  styleUrls: ['./card-list-item.component.css']
})
export class CardListItemComponent implements OnInit {

  userSuccessRatio: number;
  @Input() card: Card;
  @Output() cardSelectionEmiter = new EventEmitter<[Card, boolean]>();
  isSelected: boolean;

  constructor() { }

  ngOnInit(): void {
  }

  emitCardSelection() {
    this.isSelected = !this.isSelected;
    this.cardSelectionEmiter.emit([this.card, this.isSelected]);
  }

}
