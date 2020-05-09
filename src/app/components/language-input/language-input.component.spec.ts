import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LanguageInputComponent } from './language-input.component';

describe('LanguageInputComponent', () => {
  let component: LanguageInputComponent;
  let fixture: ComponentFixture<LanguageInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LanguageInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LanguageInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
