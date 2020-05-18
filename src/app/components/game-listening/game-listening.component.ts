import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { Card } from 'src/app/pojos/card/card';
import { ActivatedRoute, Router } from '@angular/router';
import { FirestoreDecksService } from 'src/app/services/firestore/firestore-decks.service';
import { Deck } from 'src/app/pojos/deck/deck';

@Component({
  selector: 'app-game-listening',
  templateUrl: './game-listening.component.html',
  styleUrls: ['./game-listening.component.css']
})
export class GameListeningComponent implements OnInit {

  userID: string;
  deckID: string;
  selectedDeckObs: Observable<Deck>;
  cardsCollectionObs: Observable<Card[]>;
  cardsCollectionSize: number;
  selectedCardObs: Observable<Card>;
  selectedCard: Card;
  success: boolean;
  isAnswered: boolean; // To control UI changes & select 4 new cards
  userAnswer: string;
  speaker: SpeechSynthesis;
  voice: any; // Voice of the target language of selected deck

  constructor(private _activatedRoute: ActivatedRoute,private _router:Router, private _decksService: FirestoreDecksService) {
    this.userID = _activatedRoute.snapshot.paramMap.get('userID');
    this.deckID = _activatedRoute.snapshot.paramMap.get('deckID');
    this.speaker = window.speechSynthesis;
  }

  ngOnInit(): void {
    // Card collection of selected deck 
    this.cardsCollectionObs = this._decksService.getCardCollectionObs(this.deckID);
    this.cardsCollectionObs.subscribe(cards => { this.cardsCollectionSize = cards.length; this.newPlay() });
    // Voice of the target language of selected deck
    this.selectedDeckObs = this._decksService.getDeckObs(this.deckID);
    this.selectedDeckObs.subscribe(deck => this.voice = this.getVoice(deck.target_language));
  }

  checkAnswer() {
    this.success = this.userAnswer.toLowerCase() == this.selectedCard.answer.toLowerCase();
    this.isAnswered = true;
    // Update Firestore DB info
    this._decksService.addAnswered(this.deckID, this.selectedCard, this.userID, this.success);
  }

  newPlay() {
    this.userAnswer = "";
    // Restore control parameters
    this.isAnswered = false;
    this.success = false;
    // Random card choosed as question
    let randomPosition = Math.floor((this.cardsCollectionSize * Math.random()));
    this.cardsCollectionObs.subscribe(cards => {
      this.selectedCardObs = this._decksService.getCardObs(this.deckID, cards[randomPosition].id);
      this.selectedCardObs.subscribe(card => this.selectedCard = card);
    });
  }

  speak(rate: number): void {
    let utterance = new SpeechSynthesisUtterance(this.selectedCard.question);
    utterance.voice = this.voice;
    utterance.rate = rate;
    this.speaker.speak(utterance);
  }

  getVoice(language: string): any {
    let voices = this.speaker.getVoices();
    let languageCode: string;
    switch (language.toLowerCase()) {
      case 'arabic':
        languageCode = 'ar-sa';
        break;
      case 'chinese':
        languageCode = 'zh-cn';
        break;
      case 'english':
        languageCode = 'en-gb';
        break;
      case 'finish':
        languageCode = 'fi-fi';
        break;
      case 'french':
        languageCode = 'fr-fr';
        break;
      case 'german':
        languageCode = 'de-de';
        break;
      case 'greek':
        languageCode = 'el-gr';
        break;
      case 'hebrew':
        languageCode = 'he-il';
        break;
      case 'hindi':
        languageCode = 'hi-in';
        break;
      case 'italian':
        languageCode = 'it-it';
        break;
      case 'japanese':
        languageCode = 'ja-jp';
        break;
      case 'korean':
        languageCode = 'ko-kr';
        break;
      case 'norwegian':
        languageCode = 'no-no';
        break;
      case 'polish':
        languageCode = 'pl-pl';
        break;
      case 'portuguese':
        languageCode = 'pt-pt';
        break;
      case 'romanian':
        languageCode = 'ro-ro';
        break;
      case 'russian':
        languageCode = 'ru-ru';
        break;
      case 'spanish':
        languageCode = 'es-es';
        break;
      case 'swedish':
        languageCode = 'sv-se';
        break;
      case 'turkish':
        languageCode = 'tr-tr';
        break;
      default:
        languageCode = null;
        break;
    }
    return languageCode == null ? null : voices.find(voice => voice.lang.toLowerCase() == languageCode.toLowerCase());
  }

  navigateBack(){
    this._router.navigate(['/'+this.userID,'play','listening']);
  }

  setMyClasses() {
    return {
      "text-danger": this.isAnswered && !this.success,
      "text-success": this.isAnswered && this.success
    }
  }
}
