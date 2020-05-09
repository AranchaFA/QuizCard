import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PlayComponent } from './components/play/play.component';
import { IndexComponent } from './components/index/index.component';
import { StartComponent } from './components/start/start.component';
import { MyDecksComponent } from './components/my-decks/my-decks.component';
import { RepositoryComponent } from './components/repository/repository.component';
import { StatisticsComponent } from './components/statistics/statistics.component';

const routes: Routes = [
  {path:'', redirectTo:'index', pathMatch:'full'},
  {path:'index', component:IndexComponent},
  {path:'index/:userID', component:IndexComponent},
  {path:':userID/start', component:StartComponent},
  {path:':userID/play', component:PlayComponent},
  {path:':userID/play/:gameType', component:PlayComponent},
  {path:':userID/play/:gameType/:deckID', component:PlayComponent},
  {path:':userID/myDecks', component:MyDecksComponent},
  {path:':userID/myDecks/:deckID', component:MyDecksComponent},
  {path:':userID/statistics', component:StatisticsComponent},
  {path:':userID/statistics/:deckID', component:StatisticsComponent},
  {path:':userID/repository', component:RepositoryComponent},
  {path:':userID/repository/:nativeLanguage/:targetLanguage', component:RepositoryComponent},
  {path:':userID/repository/:nativeLanguage/:targetLanguage/:deckID', component:RepositoryComponent},
  {path:'**', redirectTo:'index'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
