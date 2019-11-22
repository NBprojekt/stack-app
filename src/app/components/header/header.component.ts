import { Component, OnInit, OnDestroy } from '@angular/core';
import { PopoverController } from '@ionic/angular';

import { MoreComponent } from './more/more.component';

import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

import { NavigationEnd, Router } from '@angular/router';
import { NotificationService } from 'src/app/services/notification/notification.service';

import { interval, forkJoin } from 'rxjs';
import { startWith, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  public title: string;
  public reviwQueues: boolean;

  public inbox: number;
  public achievements: number;
  private notificationSubscribtion$: Subscription;

  private routerSubscribtion$: Subscription;

  constructor(
    private router: Router,
    private popoverController: PopoverController,
    private notificatinoService: NotificationService,
  ) {}

  ngOnInit() {
    this.routerSubscribtion$ = this.router.events
      .pipe(
        filter((event): event is NavigationEnd => event instanceof NavigationEnd),
      ).subscribe((event: NavigationEnd) => {
        const url = this.router.url;
        this.title = this.firstToUpper(url.split('/').pop()) || 'Undefined';
      });

    this.notificationSubscribtion$ = interval(NotificationService.updateIntervall).pipe(
      startWith(() => forkJoin(
          this.notificatinoService.getInboxUnread(),
          this.notificatinoService.getAchievementsUnread(),
        )
      ),
      switchMap(() => forkJoin(
          this.notificatinoService.getInboxUnread(),
          this.notificatinoService.getAchievementsUnread(),
        )
      ),
    ).subscribe(([inboxUnread, achievementsUnread]) => {
      this.inbox = inboxUnread.items.length;
      this.achievements = achievementsUnread.items.length;
    });
  }

  ngOnDestroy() {
    this.routerSubscribtion$.unsubscribe();
    this.notificationSubscribtion$.unsubscribe();
  }

  public async showMore(event: any) {
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
}
