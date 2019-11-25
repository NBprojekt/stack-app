import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { AuthService } from '../auth/auth.service';

import { Observable } from 'rxjs/internal/Observable';
import { IResponse } from 'src/app/interfaces/response';
import { IQuestionOptions } from 'src/app/interfaces/question-options';

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

  public getInbox(options?: IQuestionOptions): Observable<IResponse> {
    const headers = new HttpHeaders()
      .set('Accept', '*/*');

    const params = new HttpParams()
      .set('key', environment.api.key)
      .set('access_token', this.authService.getToken())
      .set('pageSize', this.pageSize.toString())
      .set('page', options && options.page ? options.page.toString() : '1')
      .set('filter', options && options.filter || 'O5lYbEN2lExNfdp2Q');

    return this.http.get<IResponse>(`${this.url}inbox`, {headers, params});
  }

  public getAchievements(options?: IQuestionOptions): Observable<IResponse> {
    const url = environment.api.url + '2.3/';
    const headers = new HttpHeaders()
      .set('Accept', '*/*');

    const params = new HttpParams()
      .set('key', environment.api.key)
      .set('access_token', this.authService.getToken())
      .set('pageSize', this.pageSize.toString())
      .set('page', options && options.page ? options.page.toString() : '1')
      .set('filter', options && options.filter || 'O5lYbEN2lExNfdp2Q');

    return this.http.get<IResponse>(`${url}me/achievements`, {headers, params});
  }
}
