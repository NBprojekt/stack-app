import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs';
import * as moment from 'moment';

import { environment } from 'src/environments/environment';

import { IQuestion } from 'src/app/interfaces/question';
import { IRequestOptions } from 'src/app/interfaces/request-options';
import { IResponse, IResponseError } from 'src/app/interfaces/response';

import { AuthService } from '../auth/auth.service';
import { SitesService } from '../sites/sites.service';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private readonly url = environment.api.url + environment.api.version;
  private readonly pagesize = 20;

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private siteService: SitesService,
  ) { }

  public searchAdvanced(searchString: string, options?: IRequestOptions): Observable<IResponse> {
    const headers = new HttpHeaders()
      .set('Accept', '*/*');

    const params = new HttpParams()
      .set('key', environment.api.key)
      .set('access_token', this.authService.getToken())
      .set('site', options && options.site || this.siteService.getCurrentSite().api_site_parameter)
      .set('filter', options && options.filter || '!-.3J6_-dxUCh')
      .set('q', searchString);

    return this.http.get<IResponse>(`${this.url}search/advanced`, {headers, params});
  }
}
