import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Deck } from 'src/app/pojos/deck/deck';

@Component({
  selector: 'app-deck-list-item',
  templateUrl: './deck-list-item.component.html',
  styleUrls: ['./deck-list-item.component.css']
})
export class DeckListItemComponent implements OnInit {

  @Input() deck: Deck;
  @Output() deckEmiter = new EventEmitter<Deck>();

  constructor() { 
  }

  ngOnInit(): void {
  }

  emitDeck(){
    this.deckEmiter.emit(this.deck);
  }

}
