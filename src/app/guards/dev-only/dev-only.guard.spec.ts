import { TestBed } from '@angular/core/testing';

import { DevOnlyGuard } from './dev-only.guard';

describe('DevOnlyGuard', () => {
  let guard: DevOnlyGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(DevOnlyGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
