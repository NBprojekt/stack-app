import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { NotificationService } from 'src/app/services/notification/notification.service';


@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit, OnDestroy{
  public currentUrl: string;
  public unreadNotifications: number;
  public muteNotifications: boolean;

  private destroy = new Subject<any>();

  constructor(
    private router: Router,
    private notificationService: NotificationService,
  ) {}

  ngOnInit(): void {
    this.currentUrl = 'home';
    this.muteNotifications = false;

    this.router.events
      .pipe(
        filter((event): event is NavigationEnd => event instanceof NavigationEnd),
        takeUntil(this.destroy),
      ).subscribe((event: NavigationEnd) => {
        const url = event.urlAfterRedirects.split('/');
        this.currentUrl = url[url.length - 1];
      });

    this.notificationService
      .unreadItemsCount()
      .pipe(takeUntil(this.destroy))
      .subscribe(x => this.unreadNotifications = x);
  }

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }
}
