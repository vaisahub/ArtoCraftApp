import { TestBed, inject } from '@angular/core/testing';

import { TokenInterceptor } from './jwt.service';

describe('JwtService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TokenInterceptor]
    });
  });

  it('should be created', inject([TokenInterceptor], (service: TokenInterceptor) => {
    expect(service).toBeTruthy();
  }));
});
