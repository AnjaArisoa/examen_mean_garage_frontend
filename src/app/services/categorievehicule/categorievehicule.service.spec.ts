import { TestBed } from '@angular/core/testing';

import { CategorievehiculeService } from './categorievehicule.service';

describe('CategorievehiculeService', () => {
  let service: CategorievehiculeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CategorievehiculeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
