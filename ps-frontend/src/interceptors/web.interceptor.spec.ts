import { TestBed } from '@angular/core/testing';

import { WebInterceptor } from './web.interceptor';

describe('UrlService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WebInterceptor = TestBed.get(WebInterceptor);
    expect(service).toBeTruthy();
  });
});
