import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { Card } from 'src/app/pojos/card/card';
import { ActivatedRoute } from '@angular/router';
import { FirestoreDecksService } from 'src/app/services/firestore/firestore-decks.service';

@Component({
  selector: 'app-game-training',
  templateUrl: './game-training.component.html',
  styleUrls: ['./game-training.component.css']
})
export class GameTrainingComponent implements OnInit {

  userID: string;
  deckID: string;
  cardsCollectionObs: Observable<Card[]>;
  cardsCollectionSize: number;
  selectedCardObs: Observable<Card>;
  selectedCard: Card;
  isAnswered: boolean; // To control UI changes & select 4 new cards
  @Input() languagesOrder: boolean; // To invert languages order (question-answer)
  previousLanguagesOrder: boolean; // To control when languagesOrder has changed, to execute newPlay()
  speaker: SpeechSynthesis;
  voice: any; // Voice of the target language of selected deck

  constructor(private _activatedRoute: ActivatedRoute, private _decksService: FirestoreDecksService) {
    this.userID = _activatedRoute.snapshot.paramMap.get('userID');
    this.deckID = _activatedRoute.snapshot.paramMap.get('deckID');
    this.speaker = window.speechSynthesis;
  }

  ngOnInit(): void {
    this.cardsCollectionObs = this._decksService.getCardCollectionObs(this.deckID);
    this.cardsCollectionObs.subscribe(cards => { this.cardsCollectionSize = cards.length; this.newPlay() });
    // Voice of the target language of selected deck
    this._decksService.getDeckObs(this.deckID).subscribe(deck => this.voice = this.getVoice(deck.target_language));
  }

  ngOnChanges(): void {
    if (this.previousLanguagesOrder != this.languagesOrder) this.newPlay(); // Change cards if languagesOrder is changed
  }

  newPlay() {
    this.previousLanguagesOrder = this.languagesOrder;
    this.isAnswered = false;
    // Random card choosed as question
    let randomPosition = Math.floor((this.cardsCollectionSize * Math.random()));
    this.cardsCollectionObs.subscribe(cards => {
      this.selectedCardObs = this._decksService.getCardObs(this.deckID, cards[randomPosition].id);
      this.selectedCardObs.subscribe(card => this.selectedCard = card);
    });
  }

  speak(rate: number): void {
    if (!this.speaker.speaking) { // Speaker isn't speaking yet
      let utterance = new SpeechSynthesisUtterance(this.selectedCard.question);
      utterance.voice = this.voice;
      utterance.rate = rate;
      this.speaker.speak(utterance);
    }
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

}
