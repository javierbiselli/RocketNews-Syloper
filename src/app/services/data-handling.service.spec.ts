import { TestBed } from '@angular/core/testing';

import { DataHandlingService } from './data-handling.service';

describe('DataHandlingService', () => {
  let service: DataHandlingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataHandlingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
