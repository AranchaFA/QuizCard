import { Component, OnInit, OnChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FirestoreDecksService } from 'src/app/services/firestore/firestore-decks.service';
import { Observable } from 'rxjs';
import { Deck } from 'src/app/pojos/deck/deck';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  userID: string; // user:User
  registerNew: boolean;

  constructor(private _activatedRoute: ActivatedRoute, private _router: Router, private _decksService: FirestoreDecksService) {
    // This component will have injected FirestoreUsersService to handle user logging!!
    let paramID: string = _activatedRoute.snapshot.paramMap.get('userID');
    if (paramID == 'registerNew') {
      this.registerNew = true;
      this.userID = undefined;
    } else {
      this.registerNew = false;
      this.userID = paramID;
    }
  }

  ngOnInit(): void {
  }

  navigateLog(userID: string) {
    this.userID = userID;
    this._router.navigate(['/index', this.userID]);
  }

  navigateStart() {
    this._router.navigate(['/' + this.userID, 'start']);
  }

}
