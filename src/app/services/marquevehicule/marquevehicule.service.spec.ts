import { TestBed } from '@angular/core/testing';

import { MarquevehiculeService } from './marquevehicule.service';

describe('MarquevehiculeService', () => {
  let service: MarquevehiculeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MarquevehiculeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
