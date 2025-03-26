import { TestBed } from '@angular/core/testing';

import { CommandepiecesService } from './commandepieces.service';

describe('CommandepiecesService', () => {
  let service: CommandepiecesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CommandepiecesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
