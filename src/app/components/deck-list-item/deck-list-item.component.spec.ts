import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeckListItemComponent } from './deck-list-item.component';

describe('DeckListItemComponent', () => {
  let component: DeckListItemComponent;
  let fixture: ComponentFixture<DeckListItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeckListItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeckListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
