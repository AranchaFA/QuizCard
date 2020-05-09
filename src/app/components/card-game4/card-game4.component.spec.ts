import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardGame4Component } from './card-game4.component';

describe('CardGame4Component', () => {
  let component: CardGame4Component;
  let fixture: ComponentFixture<CardGame4Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardGame4Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardGame4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
