import { TestBed } from '@angular/core/testing';

import { LoginRedirectGuardService } from './login-redirect-guard.service';

describe('LoginRedirectGuardService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LoginRedirectGuardService = TestBed.get(LoginRedirectGuardService);
    expect(service).toBeTruthy();
  });
});
