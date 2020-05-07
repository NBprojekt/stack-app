import { Storage } from '@ionic/storage'

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { IResponse } from 'src/app/interfaces/response';

import { AuthService } from '../auth/auth.service';
import { SitesService } from '../sites/sites.service';

import { IRequestOptions } from 'src/app/interfaces/request-options';
import { Observable, BehaviorSubject } from 'rxjs';
import { IUser } from 'src/app/interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private _userChanged = new BehaviorSubject<void>(null);
  public userChanged = this._userChanged.asObservable();

  private readonly url = environment.api.url + environment.api.version;

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private siteService: SitesService,
    private storage: Storage,
  ) {
    this.siteService.siteChanged.subscribe(() => this.updateMe());
  }

  public updateMe(options?: IRequestOptions): void {
    const headers = new HttpHeaders()
      .set('Accept', '*/*');

    const params = new HttpParams()
      .set('key', environment.api.key)
      .set('access_token', this.authService.getToken())
      .set('order', options && options.order || 'desc')
      .set('filter', options && options.filter || '!-*jbN*IkLXFP')
      .set('site', options && options.site || this.siteService.getCurrentSite().api_site_parameter)
      .set('sort', options && options.sort || 'reputation');

    this.http
      .get<IResponse>(`${this.url}me`, {headers, params})
      .subscribe((response: IResponse) => this.setMe(response.items[0] as IUser));
  }

  private async setMe(user: IUser): Promise<void> {
    return new Promise(async (resolve) => {
      await this.storage.set('current_user', user);
      this._userChanged.next();

      resolve();
    });
  }

  public getMe(): Promise<IUser> {
    return this.storage.get('current_user');
  }

  public getMySites(options?: IRequestOptions): Observable<IResponse> {
    const headers = new HttpHeaders()
      .set('Accept', '*/*');

    const params = new HttpParams()
      .set('key', environment.api.key)
      .set('access_token', this.authService.getToken())
      .set('order', options && options.order || 'desc')
      .set('filter', options && options.filter || '!6OrReGomKL0fa')
      .set('sort', options && options.sort || 'reputation');

    return this.http.get<IResponse>(`${this.url}me/associated`, {headers, params});
  }

  public getMyFullReputationHistory(options?: IRequestOptions): Observable<IResponse> {
    const headers = new HttpHeaders()
      .set('Accept', '*/*');

    const params = new HttpParams()
      .set('key', environment.api.key)
      .set('access_token', this.authService.getToken())
      .set('site', options && options.site || this.siteService.getCurrentSite().api_site_parameter)
      .set('page', options && options.page.toString() || '0')
      .set('pagesize', '100')
      .set('filter', options && options.filter || '!-.SpcxOQ2Squ');

    return this.http.get<IResponse>(`${this.url}me/reputation-history/full`, {headers, params});
  }
}
