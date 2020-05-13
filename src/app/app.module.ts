import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import{FormsModule} from '@angular/forms';

// Charts.js
import { ChartsModule } from 'ng2-charts';

// Firebase library imports
import { AngularFireModule } from '@angular/fire'; // For Firebase official library (general use)
import { AngularFireAnalyticsModule } from '@angular/fire/analytics'; // If our project use Firebase Analitycs (specific use)
import { AngularFirestoreModule } from '@angular/fire/firestore'; // If our project use Firebase Firestore (specific use)
import { environment } from '../environments/environment';

// Components
import { Game4Component } from './components/game4/game4.component';
import { CardGame4Component } from './components/card-game4/card-game4.component';
import { RankingGroupComponent } from './components/ranking-group/ranking-group.component';
import { PlayComponent } from './components/play/play.component';
import { StartComponent } from './components/start/start.component';
import { IndexComponent } from './components/index/index.component';
import { MyDecksComponent } from './components/my-decks/my-decks.component';
import { StatisticsComponent } from './components/statistics/statistics.component';
import { RepositoryComponent } from './components/repository/repository.component';
import { DeckListComponent } from './components/deck-list/deck-list.component';
import { DeckListItemComponent } from './components/deck-list-item/deck-list-item.component';
import { CheckDeckListItemComponent } from './components/check-deck-list-item/check-deck-list-item.component';
import { CheckDeckListComponent } from './components/check-deck-list/check-deck-list.component';
import { KeypadComponent } from './components/keypad/keypad.component';
import { LanguageInputComponent } from './components/language-input/language-input.component';
import { CheckCardListItemComponent } from './components/check-card-list-item/check-card-list-item.component';
import { CheckCardListComponent } from './components/check-card-list/check-card-list.component';
import { DeckFormComponent } from './components/deck-form/deck-form.component';
import { CardFormComponent } from './components/card-form/card-form.component';
import { InviteUserFormComponent } from './components/invite-user-form/invite-user-form.component';
import { CardListComponent } from './components/card-list/card-list.component';
import { CardListItemComponent } from './components/card-list-item/card-list-item.component';
import { RankingUserComponent } from './components/ranking-user/ranking-user.component';
import { RankingUserItemComponent } from './components/ranking-user-item/ranking-user-item.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { GameWritingComponent } from './components/game-writing/game-writing.component';
import { GameTrainingComponent } from './components/game-training/game-training.component';

@NgModule({
  declarations: [
    AppComponent,
    Game4Component,
    CardGame4Component,
    RankingGroupComponent,
    PlayComponent,
    StartComponent,
    IndexComponent,
    MyDecksComponent,
    StatisticsComponent,
    RepositoryComponent,
    DeckListComponent,
    DeckListItemComponent,
    CheckDeckListItemComponent,
    CheckDeckListComponent,
    KeypadComponent,
    LanguageInputComponent,
    CheckCardListItemComponent,
    CheckCardListComponent,
    DeckFormComponent,
    CardFormComponent,
    InviteUserFormComponent,
    CardListComponent,
    CardListItemComponent,
    RankingUserComponent,
    RankingUserItemComponent,
    NavBarComponent,
    GameWritingComponent,
    GameTrainingComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAnalyticsModule,
    AngularFirestoreModule,
    ChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
