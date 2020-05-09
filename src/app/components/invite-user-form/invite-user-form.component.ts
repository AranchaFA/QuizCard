import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-invite-user-form',
  templateUrl: './invite-user-form.component.html',
  styleUrls: ['./invite-user-form.component.css']
})
export class InviteUserFormComponent implements OnInit {

  newUserEmail: string;
  @Output() emailEmitter = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

  emitEmail() {
    // We should validate email before emit it!
    this.emailEmitter.emit(this.newUserEmail);
  }

  cancel(){
    this.emailEmitter.emit('cancel');
  }
}
