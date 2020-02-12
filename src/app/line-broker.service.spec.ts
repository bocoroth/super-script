import { TestBed } from '@angular/core/testing';

import { LineBrokerService } from './line-broker.service';

describe('LineBrokerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LineBrokerService = TestBed.get(LineBrokerService);
    expect(service).toBeTruthy();
  });
});
