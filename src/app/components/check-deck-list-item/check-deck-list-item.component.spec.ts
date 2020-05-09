import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckDeckListItemComponent } from './check-deck-list-item.component';

describe('CheckDeckListItemComponent', () => {
  let component: CheckDeckListItemComponent;
  let fixture: ComponentFixture<CheckDeckListItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckDeckListItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckDeckListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
