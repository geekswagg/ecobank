import { TestBed } from '@angular/core/testing';

import { DynamicLinkService } from './dynamic-link.service';

describe('DynamicLinkService', () => {
  let service: DynamicLinkService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DynamicLinkService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
