import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-language-input',
  templateUrl: './language-input.component.html',
  styleUrls: ['./language-input.component.css']
})
export class LanguageInputComponent implements OnInit {

  @Input() chosenValue: string;
  @Output() valueEmitter = new EventEmitter<string>();

  constructor() {
  }

  ngOnInit(): void {
    this.emitValue(); // To bind value at first! If not, value isn't emitted if user doesn't change language on dropdown list!
  }

  emitValue() {
    this.valueEmitter.emit(this.chosenValue);
  }

}
