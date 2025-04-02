import { TestBed } from '@angular/core/testing';

import { DureeTacheService } from './duree-tache.service';

describe('DureeTacheService', () => {
  let service: DureeTacheService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DureeTacheService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
