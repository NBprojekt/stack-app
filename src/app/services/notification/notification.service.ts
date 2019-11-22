import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { AuthService } from '../auth/auth.service';

import { Observable } from 'rxjs/internal/Observable';
import { switchMap, map, tap } from 'rxjs/operators';
import { IResponse } from 'src/app/interfaces/response';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  public static readonly updateIntervall = 5 * 60 * 100;
  
  private readonly url = environment.api.url + environment.api.version;

  constructor(
    private http: HttpClient,
    private authService: AuthService,
  ) {}

  public getInboxUnread(): Observable<number> {
    const headers = new HttpHeaders()
      .set('Accept', '*/*');

    const params = new HttpParams()
      .set('key', environment.api.key)
      .set('access_token', this.authService.getToken())
      .set('site', 'stackoverflow');

    return this.http.get<number>(`${this.url}me/inbox/unread`, {headers, params});
  }

  public getAchievementsUnread(): Observable<number> {
    const headers = new HttpHeaders()
      .set('Accept', '*/*');

    const params = new HttpParams()
      .set('key', environment.api.key)
      .set('access_token', this.authService.getToken());

    return this.http.get<number>(`${this.url}notifications/unread`, {headers, params});
  }
}
