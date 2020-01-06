import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { AuthService } from '../auth/auth.service';

import { Observable } from 'rxjs/internal/Observable';
import { IResponse } from 'src/app/interfaces/response';
import { IRequestOptions } from 'src/app/interfaces/request-options';

import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  public static readonly updateIntervall = 3 * 60 * 1000;

  private readonly url = environment.api.url + environment.api.version;
  private readonly pageSize: number = 30;

  constructor(
    private http: HttpClient,
    private authService: AuthService,
  ) {}

  public getInbox(options?: IRequestOptions): Observable<IResponse> {
    const headers = new HttpHeaders()
      .set('Accept', '*/*');

    const params = new HttpParams()
      .set('key', environment.api.key)
      .set('access_token', this.authService.getToken())
      .set('pageSize', this.pageSize.toString())
      .set('page', options && options.page ? options.page.toString() : '1')
      .set('filter', options && options.filter || 'O5S*m-)1)Zf-pNVNM');

    return this.http.get<IResponse>(`${this.url}inbox`, {headers, params});
  }

  public getAchievements(options?: IRequestOptions): Observable<IResponse> {
    const url = environment.api.url + '2.3/';
    const headers = new HttpHeaders()
      .set('Accept', '*/*');

    if (!(options && options.page)) {
      options = {
        page: 1,
      };
    }

    const params = new HttpParams()
      .set('key', environment.api.key)
      .set('access_token', this.authService.getToken())
      .set('pageSize', options.page ? (options.page * this.pageSize).toString() : this.pageSize.toString())
      .set('page', '1')
      .set('filter', options.filter || 'O5S*m-)1)Zf-pNVNM');

    return this.http
      .get<IResponse>(`${url}me/achievements`, {headers, params})
      .pipe(
        map((response: IResponse) => {
          response.items = response.items.splice((options.page * this.pageSize) - this.pageSize, options.page * this.pageSize);
          return response;
        })
      );
  }
}
