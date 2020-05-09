import { Component } from '@angular/core';
// Firebase Firestore imports
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection, DocumentChangeAction, DocumentSnapshot, Action } from '@angular/fire/firestore';
import 'firebase/firestore';
import { Deck } from './pojos/deck/deck';
import { FirestoreDecksService } from './services/firestore/firestore-decks.service';
import { Card } from './pojos/card/card';
import { Statistic } from './pojos/statistic/statistic';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-quizcard';

  constructor(public _firestoreDecksServ: FirestoreDecksService) {
  }

}
