import { Injectable, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { InAppBrowser, InAppBrowserEvent, InAppBrowserObject } from '@ionic-native/in-app-browser/ngx';

import { environment } from 'src/environments/environment';

import { Subscription } from 'rxjs';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly oAuthUrl = `https://stackoverflow.com/oauth/dialog?client_id=${environment.oAuth.clientId}&redirect_uri=${environment.oAuth.redirectUrl}&scope=${environment.oAuth.scope}`;
  private token: string;
  private allowBrowserClose: boolean;

  constructor(
    private ngZone: NgZone,
    private http: HttpClient,
    private inAppBrowser: InAppBrowser,
    private router: Router,
    private toastController: ToastController,
  ) { }

  public openLogin(): void {
    const browser: InAppBrowserObject = this.inAppBrowser.create(this.oAuthUrl, '_blank', 'location=no,zoom=no');
    this.allowBrowserClose = false;

    const loadSubscribtion$: Subscription = browser.on('loadstart').subscribe((event: InAppBrowserEvent) => {
      const url = event.url.split('//')[1];

      if (url.startsWith('localhost')) {
        this.allowBrowserClose = true;
        browser.close();

        this.successfulLogin(url);

        loadSubscribtion$.unsubscribe();
      }
    });

    const exitSubscribtion$ = browser.on('exit').subscribe(() => {
      if (!this.allowBrowserClose) {
        this.showCanceledToast();
      }

      exitSubscribtion$.unsubscribe();
    });
  }

  public isAuthenticated(): boolean {
    // TODO: Implement validation token function
    return !!this.token;
  }
  public getToken(): string {
    return this.token;
  }

  private validateToken() {}

  private successfulLogin(url: string): void {
    this.token = url.substring(
      url.indexOf('=') + 1,
      url.lastIndexOf('&')
    );

    this.ngZone.run(() => this.router.navigateByUrl('/menu'));
  }

  private async showCanceledToast(): Promise<any> {
    const toast = await this.toastController.create({
      header: 'Authentication failed',
      message: 'You canceled the authentication please try again to gain access.',
      position: 'bottom',
      showCloseButton: true,
      closeButtonText: 'OK',
      duration: 5e4,
    });

    toast.present();
  }
}