import { TestBed } from '@angular/core/testing';

import { MacardvService } from './macardv.service';

describe('MacardvService', () => {
  let service: MacardvService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MacardvService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
