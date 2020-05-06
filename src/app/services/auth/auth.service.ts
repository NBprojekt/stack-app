import { Injectable, NgZone } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';

import { Storage } from '@ionic/storage';
import { InAppBrowser, InAppBrowserEvent, InAppBrowserObject } from '@ionic-native/in-app-browser/ngx';

import { environment } from 'src/environments/environment';

import { Subscription, Observable } from 'rxjs';
import { ToastController } from '@ionic/angular';
import { IResponse, IResponseError } from 'src/app/interfaces/response';
import { AppComponent } from 'src/app/app.component';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly oAuthUrl = `https://stackoverflow.com/oauth/dialog?client_id=${environment.oAuth.clientId}&redirect_uri=${environment.oAuth.redirectUrl}&scope=${environment.oAuth.scope}`;
  private readonly apiUrl = environment.api.url + environment.api.version;
  private token: string;
  private allowBrowserClose: boolean;

  constructor(
    private ngZone: NgZone,
    private http: HttpClient,
    private inAppBrowser: InAppBrowser,
    private router: Router,
    private toastController: ToastController,
    private storage: Storage,
  ) {
    this.loadToken();
  }

  public openLogin(): void {
    const browser: InAppBrowserObject = this.inAppBrowser.create(this.oAuthUrl, '_blank', 'location=no,zoom=no,shouldPauseOnSuspend=yes,clearcache=yes,clearsessioncache=yes');
    this.allowBrowserClose = false;

    const loadSubscribtion$: Subscription = browser.on('loadstart').subscribe((event: InAppBrowserEvent) => {
      const url = event.url.split('//')[1];

      if (url.startsWith(environment.oAuth.redirectUrl.split('//')[1])) {
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

  public async isAuthenticated(): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      if (!this.token && !await this.loadToken()) {
        resolve(false);
        return;
      }

      this.validateToken(this.getToken()).subscribe(
        (response: IResponse) => {
          const authenticated = response && response.items.length > 0;

          console.log(response)

          if (!authenticated) {
            this.token = null;
          }

          resolve(authenticated);
        },
        (response: IResponseError) => {
          reject()
        }
      );
    });
  }

  public getToken(): string {
    return this.token;
  }

  public validateToken(token: string): Observable<IResponse> {
    const headers = new HttpHeaders()
      .set('Accept', '*/*');

    const params = new HttpParams()
      .set('key', environment.api.key);

    return this.http.get<IResponse>(`${this.apiUrl}access-tokens/${token}`, {headers, params});
  }

  public async logOut(): Promise<void> {
    AppComponent.loading.next(true);

    const headers = new HttpHeaders()
      .set('Accept', '*/*');

    const params = new HttpParams()
      .set('key', environment.api.key);

    return new Promise(async (resolve) => {
      await this.storage.clear();

      this.http.get<IResponse>(`${this.apiUrl}access-tokens/${this.token}/invalidate`, {headers, params})
        .subscribe(() => {
          AppComponent.loading.next(false);
          this.router.navigateByUrl('/login');
          resolve();
        });
    });
  }

  private successfulLogin(url: string): void {
    if (environment.production) {
      this.token = url.split('=')[1];
    } else {
      this.token = url.substring(
        url.indexOf('=') + 1,
        url.lastIndexOf('&')
      );
    }

    this.saveToken(this.token);

    this.ngZone.run(() => this.router.navigateByUrl('/menu'));
  }

  private async showCanceledToast(): Promise<any> {
    const toast = await this.toastController.create({
      header: 'Authentication failed',
      message: 'You canceled the authentication please try again to gain access.',
      position: 'bottom',
      showCloseButton: true,
      closeButtonText: 'OK',
      duration: 5e3,
    });

    toast.present();
  }

  private loadToken(): Promise<boolean> {
    return new Promise(async (resolve) => {
      const token = await this.storage.get('access_token');
      this.token = token;
      resolve(!!token);
    });
  }

  private saveToken(token: string): void {
    this.storage.set('access_token', token);
  }
}
