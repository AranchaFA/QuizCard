import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckCardListItemComponent } from './check-card-list-item.component';

describe('CheckCardListItemComponent', () => {
  let component: CheckCardListItemComponent;
  let fixture: ComponentFixture<CheckCardListItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckCardListItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckCardListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
