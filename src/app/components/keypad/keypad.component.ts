import { Component, OnInit, OnChanges, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-keypad',
  templateUrl: './keypad.component.html',
  styleUrls: ['./keypad.component.css']
})
export class KeypadComponent implements OnInit {

  @Input() isEditable: boolean;
  @Input() isCopyable: boolean;
  edit: boolean = false;
  remove: boolean = false;
  copy: boolean = false;
  add: boolean = false;
  update: boolean = false;
  cancel: boolean = false;
  @Input() isDisabled: boolean;
  @Output() clickEmiter = new EventEmitter<string>();
  @Input() addIsDisabled: boolean;


  constructor() { }

  ngOnInit(): void {
    this.edit = this.isEditable;
    this.remove = this.isEditable;
    this.add = this.isEditable;
    this.copy = this.isCopyable;
    this.update = !this.edit;
    this.cancel = !this.edit && !this.add;
  }

  ngOnChanges() {
    // Restore init state after finish updating
    this.ngOnInit();
  }

  emitClick(actionType: string) {
    switch (actionType) {
      case 'edit':
        // Change states while editing (after do it, ngOnChanges is executed!)
        this.edit = !this.edit;
        this.update = !this.edit;
        this.cancel = !this.edit;
        this.remove = !this.update;
        this.add = !this.update;
        break;
      case 'add':
        if (!this.cancel) { // First time clicked
          this.edit = false;
          this.update = false;
          this.remove = false;
          this.copy = false;
          this.add = true;
          this.cancel = true
        } else { // When finally the deck is added (user can click some times after introducing a valid name) adding+cancel showed
          this.ngOnInit();
        }
        break;
      case 'copy':
        if (!this.cancel) { // First time clicked (cancel button isn't shown)
          this.edit = false;
          this.update = false;
          this.remove = false;
          this.add = false;
          this.copy = true;
          this.cancel = true
        } else { // Second time clicked (cancel button is shown)
          // Restore init parameters
          this.ngOnInit();
        }
        break;
      default:
        // Cancel/Update
        this.ngOnInit();
        break;
    }
    this.clickEmiter.emit(actionType);
  }

  /**
   * TO IMPLEMENT IN EACH COMPONENTS THAT WILL CONTAINS KEYPAD COMPONENT (must be customized depending on the needs):
   * 
   * clickAction(actionType: string) {
    switch (actionType) {
      case 'edit':
        // Show editing options
        console.log('EDIT CLICKED!');
        break;
      case 'update':
        // Process modifications on selected decks and update throw Firestore service!!!
        console.log('UPDATE CLICKED!');
        break;
      case 'cancel':
        // No aactions
        console.log('CANCEL CLICKED!');
        break;
      case 'remove':
        // Remove selected decks throw Firestore service!!!
        break;
      case 'add':
        // Add new deck/card throw Firestore service!!!
        break;
      case 'copy':
        // Show user decks list to choose one to copy selected cards to
        break;
      default:
        console.error('Invalid click action type!');
        break;
    }
  }
   */
}
