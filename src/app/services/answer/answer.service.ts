import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs';
import * as moment from 'moment';

import { environment } from 'src/environments/environment';


import { IAnswer } from 'src/app/interfaces/answer';
import { IRequestOptions } from 'src/app/interfaces/request-options';
import { IResponse, IResponseError } from 'src/app/interfaces/response';

import { AuthService } from '../auth/auth.service';
import { SitesService } from '../sites/sites.service';

@Injectable({
  providedIn: 'root'
})
export class AnswerService {
  private readonly url = environment.api.url + environment.api.version;
  private readonly pagesize = 20;

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private siteService: SitesService,
  ) { }

  // Voting
  public upvoteAnswer(id: number, options?: IRequestOptions): Observable<IResponse | IResponseError> {
    const headers = new HttpHeaders()
    .set('Accept', '*/*')
      .set('Content-Type', 'application/x-www-form-urlencoded');

    const body = {
      key: environment.api.key,
      access_token: this.authService.getToken(),
      site: options && options.site || this.siteService.getCurrentSite().api_site_parameter,
      preview: !environment.production,
      filter: options && options.filter || 'default',
    };

    return this.http.post<IResponse | IResponseError>(
      `${this.url}answers/${id}/upvote`,
      this.bodyToFormBody(body),
      { headers }
    );
  }
  public upvoteAnswerUndo(id: number, options?: IRequestOptions): Observable<IResponse | IResponseError> {
    const headers = new HttpHeaders()
      .set('Accept', '*/*')
      .set('Content-Type', 'application/x-www-form-urlencoded');

    const body = {
      key: environment.api.key,
      access_token: this.authService.getToken(),
      site: options && options.site || this.siteService.getCurrentSite().api_site_parameter,
      preview: !environment.production,
      filter: options && options.filter || 'default',
    };

    return this.http.post<IResponse | IResponseError>(
      `${this.url}answers/${id}/upvote/undo`,
      this.bodyToFormBody(body),
      { headers }
    );
  }
  public downvoteAnswer(id: number, options?: IRequestOptions): Observable<IResponse | IResponseError> {
    const headers = new HttpHeaders()
      .set('Accept', '*/*')
      .set('Content-Type', 'application/x-www-form-urlencoded');

    const body = {
      key: environment.api.key,
      access_token: this.authService.getToken(),
      site: options && options.site || this.siteService.getCurrentSite().api_site_parameter,
      preview: !environment.production,
      filter: options && options.filter || 'default',
    };

    return this.http.post<IResponse | IResponseError>(
      `${this.url}answers/${id}/downvote`,
      this.bodyToFormBody(body),
      { headers }
    );
  }
  public downvoteAnswerUndo(id: number, options?: IRequestOptions): Observable<IResponse | IResponseError> {
    const headers = new HttpHeaders()
      .set('Accept', '*/*')
      .set('Content-Type', 'application/x-www-form-urlencoded');

    const body = {
      key: environment.api.key,
      access_token: this.authService.getToken(),
      site: options && options.site || this.siteService.getCurrentSite().api_site_parameter,
      preview: !environment.production,
      filter: options && options.filter || 'default',
    };

    return this.http.post<IResponse | IResponseError>(
      `${this.url}answers/${id}/downvote/undo`,
      this.bodyToFormBody(body),
      { headers }
    );
  }

  // Accept
  public acceptAnswer(id: number, options?: IRequestOptions): Observable<IResponse | IResponseError> {
    const headers = new HttpHeaders()
      .set('Accept', '*/*')
      .set('Content-Type', 'application/x-www-form-urlencoded');

    const body = {
      key: environment.api.key,
      access_token: this.authService.getToken(),
      site: options && options.site || this.siteService.getCurrentSite().api_site_parameter,
      preview: !environment.production,
      filter: options && options.filter || 'default',
    };

    return this.http.post<IResponse | IResponseError>(
      `${this.url}answers/${id}/accept`,
      this.bodyToFormBody(body),
      { headers }
    );
  }
  public acceptAnswerUndo(id: number, options?: IRequestOptions): Observable<IResponse | IResponseError> {
    const headers = new HttpHeaders()
      .set('Accept', '*/*')
      .set('Content-Type', 'application/x-www-form-urlencoded');

    const body = {
      key: environment.api.key,
      access_token: this.authService.getToken(),
      site: options && options.site || this.siteService.getCurrentSite().api_site_parameter,
      preview: !environment.production,
      filter: options && options.filter || 'default',
    };

    return this.http.post<IResponse | IResponseError>(
      `${this.url}answers/${id}/accept/undo`,
      this.bodyToFormBody(body),
      { headers }
    );
  }

  // Helper
  private bodyToFormBody(obj: any): string {
    const formBody = [];
    for (const property in obj) {
      if (obj.hasOwnProperty(property)) {
        const encodedKey = encodeURIComponent(property);
        const encodedValue = encodeURIComponent(obj[property]);
        formBody.push(`${encodedKey}=${encodedValue}`);
      }
    }
    return formBody.join('&');
  }
}
