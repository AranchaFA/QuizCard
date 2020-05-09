import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RankingUserComponent } from './ranking-user.component';

describe('RankingUserComponent', () => {
  let component: RankingUserComponent;
  let fixture: ComponentFixture<RankingUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RankingUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RankingUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
