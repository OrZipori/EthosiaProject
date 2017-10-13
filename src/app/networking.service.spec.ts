/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { NetworkingService } from './networking.service';

describe('NetworkingService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NetworkingService]
    });
  });

  it('should ...', inject([NetworkingService], (service: NetworkingService) => {
    expect(service).toBeTruthy();
  }));
});
