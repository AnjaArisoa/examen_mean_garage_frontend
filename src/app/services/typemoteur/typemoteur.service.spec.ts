import { TestBed } from '@angular/core/testing';

import { TypemoteurService } from './typemoteur.service';

describe('TypemoteurService', () => {
  let service: TypemoteurService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TypemoteurService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
