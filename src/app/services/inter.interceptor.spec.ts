import { TestBed } from '@angular/core/testing';

import { InterInterceptor } from './inter.interceptor';

describe('InterInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      InterInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: InterInterceptor = TestBed.inject(InterInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
