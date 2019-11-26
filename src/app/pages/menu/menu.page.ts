import { Component, OnInit, OnDestroy } from '@angular/core';

import { Router, NavigationEnd } from '@angular/router';

import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit, OnDestroy {
  public selectedUrl: string;

  private routerSubscribtion$: Subscription;

  public pages = [
    {
        title: 'Home',
        url: '/menu/pages/tabs/home',
        icon: 'home',
        routerDirection: 'root',
        lines: 'none',
    },
    {
        title: 'Search',
        url: '/menu/pages/tabs/search',
        icon: 'search',
        routerDirection: 'root',
        lines: 'none',
    },
    {
        title: 'Jobs',
        url: '/menu/pages/tabs/jobs',
        icon: 'business',
        routerDirection: 'root',
        lines: 'full',
    },
    {
        title: 'Setting',
        url: '/menu/settings',
        icon: 'settings',
        routerDirection: 'forward',
        lines: 'none',
    },
    {
        title: 'About',
        url: '/menu/about',
        icon: 'information-circle',
        routerDirection: 'root',
        lines: 'none',
    },
  ];

  constructor(
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.selectedUrl = '';

    this.routerSubscribtion$ = this.router.events
      .pipe(
        filter((event): event is NavigationEnd => event instanceof NavigationEnd),
      ).subscribe((event: NavigationEnd) => {
        this.selectedUrl = event.url;
      });
  }

  ngOnDestroy() {
    this.routerSubscribtion$.unsubscribe();
  }
}
