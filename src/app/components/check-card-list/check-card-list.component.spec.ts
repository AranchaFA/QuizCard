import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckCardListComponent } from './check-card-list.component';

describe('CheckCardListComponent', () => {
  let component: CheckCardListComponent;
  let fixture: ComponentFixture<CheckCardListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckCardListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckCardListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
