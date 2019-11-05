import { Component, OnInit, OnDestroy } from '@angular/core';

import { Router, NavigationEnd } from '@angular/router';

import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { NONE_TYPE } from '@angular/compiler/src/output/output_ast';

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
        url: './tabs/home',
        icon: 'home',
    },
    {
        title: 'Search',
        url: './tabs/search',
        icon: 'search',
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
