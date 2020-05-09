import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { Card } from 'src/app/pojos/card/card';
import { timer } from 'rxjs';

@Component({
  selector: 'app-card-game4',
  templateUrl: './card-game4.component.html',
  styleUrls: ['./card-game4.component.css']
})
export class CardGame4Component implements OnInit, OnChanges {

  @Input() index: number;
  @Input() card: Card;
  @Input() isAnswered: boolean;
  @Input() isCorrect: boolean;
  @Output() indexEmiter = new EventEmitter<number>();
  isSelected: boolean; // To assign CSS class .card-selected. 

  constructor() {
    this.isSelected = false;
  }

  ngOnInit(): void { }

  ngOnChanges(): void {
    // If we initialize isSelected='false' on constructor/ngOnInit it will keep selected if the card is repeated
    // the next play (because it isn't 'created' again, the same 'object' component will be used again).
    timer(1000).subscribe(() => this.isSelected = false); // timer(1000), as the timer to newPlay on parent component
  }

  select() {
    if (!this.isAnswered) { // Click 'unabled' if already answered
      this.isSelected = true;
      this.emitIndex();
    }
  }

  emitIndex() {
    this.indexEmiter.emit(this.index);
  }

  setMyClasses() {
    return {
      bolder: this.isSelected || (this.isAnswered && this.isCorrect), // Selected or correct after been answered
      "text-danger": this.isSelected && !this.isCorrect,
      "text-success": this.isAnswered && this.isCorrect
    }
  }

}
