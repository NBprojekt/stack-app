import { Injectable } from '@angular/core';
import { Router, CanLoad, UrlSegment, Route } from '@angular/router';

import { AuthService } from 'src/app/services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanLoad {

  constructor(
    private authService: AuthService,
    private router: Router,
  ) { }

  public async canLoad(route: Route, segments: UrlSegment[]): Promise<boolean> {
    const isAuthenticated = await this.authService.isAuthenticated();

    if (isAuthenticated) {
      this.router.navigate(['/menu']);
    }

    return !isAuthenticated;
  }
}
