import { TestBed } from '@angular/core/testing';

import { ServicePointsService } from './service-points.service';

describe('ServicePointsService', () => {
  let service: ServicePointsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServicePointsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
