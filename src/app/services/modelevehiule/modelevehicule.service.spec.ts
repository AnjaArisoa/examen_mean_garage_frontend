import { TestBed } from '@angular/core/testing';

import { ModelevehiculeService } from './modelevehicule.service';

describe('ModelevehiculeService', () => {
  let service: ModelevehiculeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ModelevehiculeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
