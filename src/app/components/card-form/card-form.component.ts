import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Card } from 'src/app/pojos/card/card';

@Component({
  selector: 'app-card-form',
  templateUrl: './card-form.component.html',
  styleUrls: ['./card-form.component.css']
})
export class CardFormComponent implements OnInit {

  newCard: Card = new Card();
  @Output() newCardEmitter = new EventEmitter<Card>();

  constructor() {
    this.newCard.question = 'New question';
    this.newCard.answer = 'New answer';
  }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    if (this.newCard.question.length>0 && this.newCard.answer.length>0) {
      this.newCardEmitter.emit(this.newCard);
    }
  }

}
