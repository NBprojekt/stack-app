import { Injectable, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { InAppBrowser, InAppBrowserEvent, InAppBrowserObject } from '@ionic-native/in-app-browser/ngx';

import { environment } from 'src/environments/environment';

import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly oAuthUrl = `https://stackoverflow.com/oauth?client_id=${environment.oAuth.clientId}&redirect_uri=${environment.oAuth.redirectUrl}&scope=${environment.oAuth.scope}`;
  private token: string;

  constructor(
    private ngZone: NgZone,
    private http: HttpClient,
    private inAppBrowser: InAppBrowser,
    private router: Router,
  ) { }

  public openLogin(): void {
    const browser: InAppBrowserObject = this.inAppBrowser.create(this.oAuthUrl, '_blank', 'location=yes');

    const sunscribtion: Subscription = browser.on('loadstart').subscribe((event: InAppBrowserEvent) => {
      const url = event.url.split('//')[1];

      if (url.startsWith('localhost')) {
        browser.close();

        this.token = url.split('code')[1];
        this.ngZone.run(() => this.router.navigateByUrl('/menu'));

        sunscribtion.unsubscribe();
      }
    });
  }

  public isAuthenticated(): boolean {
    // TODO: Implement validation token function
    return !!this.token;
  }

  private validateToken() {}
}
