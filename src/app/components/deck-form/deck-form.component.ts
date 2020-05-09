import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Deck } from 'src/app/pojos/deck/deck';

@Component({
  selector: 'app-deck-form',
  templateUrl: './deck-form.component.html',
  styleUrls: ['./deck-form.component.css']
})
export class DeckFormComponent implements OnInit {

  newDeck: Deck = new Deck();
  @Output() newDeckEmitter = new EventEmitter<Deck>();

  constructor() {
    this.newDeck.name = 'My new deck !'
  }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    if (this.newDeck.name.length>0) {
      this.newDeckEmitter.emit(this.newDeck);
    } 
  }

}
