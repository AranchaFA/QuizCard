import { TestBed } from '@angular/core/testing';

import { FirestoreDecksService } from './firestore-decks.service';

describe('FirestoreDecksService', () => {
  let service: FirestoreDecksService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FirestoreDecksService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
