import { Component, OnInit, OnChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { interval } from 'rxjs';
import { Deck } from 'src/app/pojos/deck/deck';
import { FirestoreDecksService } from 'src/app/services/firestore/firestore-decks.service';

@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.css']
})
export class PlayComponent implements OnInit {

  gameType: string;
  deckID: string;
  userID: string;
  // Carousel options
  options: string[] = ['QUIZ', 'WRITING', 'LISTENING', 'TRAINING'];
  optionLabels: string[] = ['Choose between 4 posible responses.',
    'Write the translation of what you read.',
    'Write the translation of what you hear.',
    'Just give your vocabulary a review.'];
  optionShowed: number = 0;

  constructor(private _activateRoute: ActivatedRoute, private _router: Router) {
    this.gameType = this._activateRoute.snapshot.paramMap.get('gameType');
    this.deckID = this._activateRoute.snapshot.paramMap.get('deckID');
    this.userID = this._activateRoute.snapshot.paramMap.get('userID');
  }

  ngOnInit(): void {
    // Carousel summary
    interval(3000).subscribe(() => this.changeOption()); // Interval doesn't have UNSUBSCRIBE method! When component 'dies' it doesn't!
  }

  changeOption() {
    this.optionShowed < 3 ? this.optionShowed++ : this.optionShowed = 0;
  }

  navigateButton(indexOption: number) {
    switch (indexOption) {
      case 0:
        this._router.navigate(['/' + this.userID, 'play', 'quiz']);
        break;
      case 1:
        this._router.navigate(['/' + this.userID, 'play', 'writing']);
        break;
      case 2:
        this._router.navigate(['/' + this.userID, 'play', 'listening']);
        break;
      case 3:
        this._router.navigate(['/' + this.userID, 'play', 'training']);
        break;
      default:
        console.error('Invalid option index');
        break;
    }
  }

  navigateDeck(deck: Deck) {
    this._router.navigate(['/' + this.userID, 'play', this.gameType, deck.id]);
  }

}
