import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckDeckListComponent } from './check-deck-list.component';

describe('CheckDeckListComponent', () => {
  let component: CheckDeckListComponent;
  let fixture: ComponentFixture<CheckDeckListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckDeckListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckDeckListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
