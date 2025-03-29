import { TestBed } from '@angular/core/testing';

import { DetaildevisService } from './detaildevis.service';

describe('DetaildevisService', () => {
  let service: DetaildevisService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DetaildevisService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
