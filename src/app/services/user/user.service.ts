import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { IResponse } from 'src/app/interfaces/response';

import { AuthService } from '../auth/auth.service';
import { SitesService } from '../sites/sites.service';

import { IRequestOptions } from 'src/app/interfaces/request-options';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly url = environment.api.url + environment.api.version;

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private siteService: SitesService,
  ) { }

  public getMe(options?: IRequestOptions): Observable<IResponse> {
    const headers = new HttpHeaders()
      .set('Accept', '*/*');

    const params = new HttpParams()
      .set('key', environment.api.key)
      .set('access_token', this.authService.getToken())
      .set('order', options && options.order || 'desc')
      .set('filter', options && options.filter || '!9Z(-woBMT')
      .set('site', options && options.site || this.siteService.getCurrentSite().api_site_parameter)
      .set('sort', options && options.sort || 'reputation');

    return this.http.get<IResponse>(`${this.url}me`, {headers, params});
  }

  public getMySites(options?: IRequestOptions): Observable<IResponse> {
    const headers = new HttpHeaders()
      .set('Accept', '*/*');

    const params = new HttpParams()
      .set('key', environment.api.key)
      .set('access_token', this.authService.getToken())
      .set('order', options && options.order || 'desc')
      .set('filter', options && options.filter || '!6OrReGp1MYF)i')
      .set('sort', options && options.sort || 'reputation');

    return this.http.get<IResponse>(`${this.url}me/associated`, {headers, params});
  }
}
