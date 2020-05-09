import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { interval } from 'rxjs';
import { FirestoreDecksService } from 'src/app/services/firestore/firestore-decks.service';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css']
})
export class StartComponent implements OnInit {

  userID: string;
  // Carousel options
  options: string[] = ['PLAY', 'MY DECKS', 'MY STATISTICS', 'REPOSITORY'];
  optionLabels: string[] = ['Choose between multiple game modes, and have fun!',
    'Build your own decks collection, and customize your study!',
    'Follow your improvements, and boost your progress!',
    'Check out decks from other players, and keep the cards that suit you!'];
  optionShowed: number = 0;


  constructor(private _activatedRoute: ActivatedRoute, private _router: Router, private _decksService: FirestoreDecksService) {
    this.userID = this._activatedRoute.snapshot.paramMap.get('userID');
    // This component will have injected FirestoreUsersService to handle user info (list of his/her decks to load them)
  }

  ngOnInit(): void {
    // To control carousel options
    interval(3500).subscribe(() => this.changeOption()); // Interval doesn't have UNSUBSCRIBE method! When component 'dies' it doesn't!
  }

  changeOption() {
    this.optionShowed < 3 ? this.optionShowed++ : this.optionShowed = 0;
  }

  navigateButton(indexOption: number) {
    switch (indexOption) {
      case 0:
        this._router.navigate(['/' + this.userID, 'play']);
        break;
      case 1:
        this._router.navigate(['/' + this.userID, 'myDecks']);
        break;
      case 2:
        this._router.navigate(['/' + this.userID, 'statistics']);
        break;
      case 3:
        this._router.navigate(['/' + this.userID, 'repository']);
        break;
      default:
        console.error('Invalid option index');
        break;
    }
  }
}
