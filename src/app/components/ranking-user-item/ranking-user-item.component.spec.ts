import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RankingUserItemComponent } from './ranking-user-item.component';

describe('RankingUserItemComponent', () => {
  let component: RankingUserItemComponent;
  let fixture: ComponentFixture<RankingUserItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RankingUserItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RankingUserItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
