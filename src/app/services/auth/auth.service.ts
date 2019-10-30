import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { InAppBrowser, InAppBrowserEvent } from '@ionic-native/in-app-browser/ngx';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly oAuthUrl = `https://stackoverflow.com/oauth?client_id=${environment.oAuth.clientId}&redirect_uri=${environment.oAuth.redirectUrl}&scope=${environment.oAuth.scope}`;
  private token: string;

  constructor(
    private http: HttpClient,
    private inAppBrowser: InAppBrowser,
    private router: Router,
  ) { }

  public openLogin(): void {
    const browser = this.inAppBrowser.create(this.oAuthUrl, '_blank', 'location=yes');

    browser.on('loadstart').subscribe((event: InAppBrowserEvent) => {
      const url = event.url.split('//')[1];

      if (url.startsWith('localhost')) {
        this.token = url.split('code')[1];
        browser.close();
        this.router.navigateByUrl('/menu');
      }
    });
  }

  public isAuthenticated(): boolean {
    // TODO: Implement validation token function
    return !!this.token;
  }

  private validateToken() {}
}
