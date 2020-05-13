import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GameTrainingComponent } from './game-training.component';

describe('GameTrainingComponent', () => {
  let component: GameTrainingComponent;
  let fixture: ComponentFixture<GameTrainingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GameTrainingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameTrainingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
