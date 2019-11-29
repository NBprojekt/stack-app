import { Component, OnInit, OnDestroy } from '@angular/core';
import { PopoverController, ModalController } from '@ionic/angular';

import { MoreComponent } from './more/more.component';

import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

import { NavigationEnd, Router } from '@angular/router';
import { NotificationService } from 'src/app/services/notification/notification.service';

import { interval, forkJoin } from 'rxjs';
import { startWith, switchMap } from 'rxjs/operators';
import { NotificationComponent } from './notification/notification.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  public title: string;
  public reviwQueues: boolean;

  public inbox: Array<any>;
  public achievements: Array<any>;
  private notificationSubscribtion$: Subscription;

  private routerSubscribtion$: Subscription;

  constructor(
    private router: Router,
    private popoverController: PopoverController,
    private modalController: ModalController,
    public notificatinoService: NotificationService,
  ) {}

  ngOnInit(): void {
    this.loadPageTitle();
    this.loadNotifications();
  }

  ngOnDestroy(): void {
    this.routerSubscribtion$.unsubscribe();
    this.notificationSubscribtion$.unsubscribe();
  }

  public loadNotifications(): void {
    this.notificationSubscribtion$ = interval(NotificationService.updateIntervall).pipe(
      startWith(() => forkJoin([
          this.notificatinoService.getInbox(),
          this.notificatinoService.getAchievements(),
        ])
      ),
      switchMap(() => forkJoin([
          this.notificatinoService.getInbox(),
          this.notificatinoService.getAchievements(),
        ])
      ),
    ).subscribe(([inbox, achievements]) => {
      console.log([inbox, achievements]);
      this.inbox = inbox.items;
      this.achievements = achievements.items;
    });
  }

  public loadPageTitle(): void {
    this.routerSubscribtion$ = this.router.events
    .pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd),
    ).subscribe((event: NavigationEnd) => {
      const url = this.router.url;
      this.title = this.firstToUpper(url.split('/').pop()) || 'Undefined';
    });
  }

  public async showMore(event: any): Promise<void> {
    const popover = await this.popoverController.create({
      component: MoreComponent,
      translucent: true,
      event,
    });
    return await popover.present();
  }

  public firstToUpper(s: string): string {
    const first = s[0].toUpperCase();
    return first + s.slice(1, s.length);
  }

  public countUnread(items: any): number {
    if (!items) {
      return 0;
    }

    return items
      .map(item => item.is_unread ?
        item.reputation_change ?
          item.reputation_change
          : 1
        : 0)
      .reduce((accumulator, currentValue) => accumulator + currentValue);
  }

  public async showNotifications(title: string, items: Array<any>, updateFunction: any): Promise<void> {
    const modal = await this.modalController.create({
      component: NotificationComponent,
      componentProps: {
        title,
        items,
      }
    });
    return await modal.present();
  }
}
