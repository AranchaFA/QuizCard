import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RankingGroupComponent } from './ranking-group.component';

describe('RankingGroupComponent', () => {
  let component: RankingGroupComponent;
  let fixture: ComponentFixture<RankingGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RankingGroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RankingGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
