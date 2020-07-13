import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { LocalNotifications } from '@ionic-native/local-notifications/ngx';

import { map, startWith, switchMap, takeUntil } from 'rxjs/operators';
import { interval, forkJoin, Subject, BehaviorSubject, Observable, Subscription } from 'rxjs';

import { AuthService } from '../auth/auth.service';
import { IResponse } from 'src/app/interfaces/response';
import { IRequestOptions } from 'src/app/interfaces/request-options';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class NotificationService implements OnDestroy {
  public static readonly updateIntervall = environment.api.updateNotificationsIntervall * 60 * 1000;

  private readonly url = environment.api.url + environment.api.version;
  private readonly pageSize: number = 30;

  private destroy: Subject<any>;
  private _inbox: BehaviorSubject<any>;
  private _achievements: BehaviorSubject<any>;
  private _unreadItemsCount: BehaviorSubject<number>;

  private notificationSubscription: Subscription;

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private localNotifications: LocalNotifications,
    private router: Router,
  ) {
    this._inbox = new BehaviorSubject<any>([]);
    this._achievements = new BehaviorSubject<any>([]);
    this._unreadItemsCount = new BehaviorSubject<number>(0);
    this.destroy = new Subject<any>();
    this.initNotificationSubscription();
  }

  public ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
    this.notificationSubscription.unsubscribe();
  }

  private initNotificationSubscription(): void {
    // On notification click navigate to notifications tab
    if(window.hasOwnProperty('cordova'))
    this.localNotifications
      .on('click')
      .pipe(takeUntil(this.destroy))
      .subscribe(() => this.router.navigateByUrl('/menu/pages/tabs/notification'));

    // Rethreave new notifications every {{NotificationService.updateIntervall}} seconds
    interval(NotificationService.updateIntervall).pipe(
      startWith(() => forkJoin([
          this.getInbox(),
          this.getAchievements(),
        ])
      ),
      switchMap(() => forkJoin([
          this.getInbox(),
          this.getAchievements(),
        ])
      ),
      takeUntil(this.destroy),
    ).subscribe(([inbox, achievements]) => {
      this._inbox.next(inbox.items);
      this._achievements.next(achievements.items);

      const unreadItemsCount = this.countUnread(inbox.items) + this.countUnread(achievements.items);
      this.sendUnreadNotification(unreadItemsCount);
      this._unreadItemsCount.next(unreadItemsCount);
    });
  }

  public inbox(): Observable<any> {
    // TODO: Fix inbox loading issues
    // Currently the notification component displays nothing when called after the app
    // was opened within NotificationService.updateIntervall.
    // Values should be repushed after inbox was requested.
    // > Current workaround `setTimeout()`
    setTimeout(() => this._inbox.next(this._inbox.getValue()), 200);
    return this._inbox.asObservable();
  }

  public achievements(): Observable<any> {
    // TODO: Fix achievements loading issues
    // Currently the notification component displays nothing when called after the app
    // was opened within NotificationService.updateIntervall.
    // Values should be repushed after achievements was requested.
    // > Current workaround `setTimeout()`
    setTimeout(() => this._achievements.next(this._achievements.getValue()), 200);
    return this._achievements.asObservable();
  }

  public unreadItemsCount(): Observable<any> {
    // TODO: Fix unreadItems loading issues
    // Values should be repushed after unread Items Count was requested.
    // > Current workaround `setTimeout()`
    setTimeout(() => this._unreadItemsCount.next(this._unreadItemsCount.getValue()), 200);
    return this._unreadItemsCount.asObservable();
  }

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

  public countUnread(items: any): number {
    if (!items || items.length === 0) {
      return 0;
    }

    return items
      .map(item => item.is_unread ? 1 : 0)
      .reduce((accumulator, currentValue) => accumulator + currentValue);
  }

  private sendUnreadNotification(unreadItemsCount: number): void {
    if(window.hasOwnProperty('cordova') && unreadItemsCount <= 0) {
      return;
    }

    this.localNotifications.schedule({
      id: 1,
      title: 'Stack App',
      text: `You have ${unreadItemsCount} unread notifications`,
      foreground : true,
      badge: unreadItemsCount,
      launch: true,
      lockscreen: true,
      icon: './assets/icon/favicon.png',
    });
  }
}
