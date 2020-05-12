import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GameWritingComponent } from './game-writing.component';

describe('GameWritingComponent', () => {
  let component: GameWritingComponent;
  let fixture: ComponentFixture<GameWritingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GameWritingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameWritingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
