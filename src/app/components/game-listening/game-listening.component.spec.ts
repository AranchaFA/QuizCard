import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GameListeningComponent } from './game-listening.component';

describe('GameListeningComponent', () => {
  let component: GameListeningComponent;
  let fixture: ComponentFixture<GameListeningComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GameListeningComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameListeningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
