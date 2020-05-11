import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FirestoreDecksService } from 'src/app/services/firestore/firestore-decks.service';
import { Observable } from 'rxjs';
import { Deck } from 'src/app/pojos/deck/deck';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  userID: string;
  gameType: string; // To show invertLanguages button
  deckID: string; // To show invertLanguages button
  deckObs: Observable<Deck>; // To show languages of invertLanguages button
  languagesOrder: boolean; // To change languages positions when invert it
  private show: boolean
  @Output() invertLanguagesEmitter = new EventEmitter<void>();

  constructor(private _activatedRoute: ActivatedRoute, private _router: Router, private _decksService: FirestoreDecksService) {
    this.userID = this._activatedRoute.snapshot.paramMap.get('userID');
    this.gameType = _activatedRoute.snapshot.paramMap.get('gameType');
    this.deckID = _activatedRoute.snapshot.paramMap.get('deckID');
    this.show = false;
  }

  ngOnInit(): void {
    if (this.gameType != null && this.deckID != null) this.deckObs = this._decksService.getDeckObs(this.deckID);
  }

  changeShow() {
    this.show = !this.show;
  }

  emitInvertLanguages() {
    this.invertLanguagesEmitter.emit();
    this.languagesOrder = !this.languagesOrder;
  }

  navigate(option: string): void {
    switch (option) {
      case 'start': if (this.userID != null) this._router.navigate(['/' + this.userID, 'start']);
        break;
      case 'play': if (this.userID != null) this._router.navigate(['/' + this.userID, 'play']);
        break;
      case 'mydecks': if (this.userID != null) this._router.navigate(['/' + this.userID, 'myDecks']);
        break;
      case 'repository': if (this.userID != null) this._router.navigate(['/' + this.userID, 'repository']);
        break;
      case 'statistics': if (this.userID != null) this._router.navigate(['/' + this.userID, 'statistics']);
        break;
      case 'index': if (this.userID != null) this._router.navigate(['/' + this.userID, 'index']);
        break;
      default: console.error('NavBar - Invalid option!');
        break;
    }
  }
}
