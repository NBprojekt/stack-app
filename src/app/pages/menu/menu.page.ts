import { Component, OnInit } from '@angular/core';

import { Router, RouterEvent, NavigationEnd } from '@angular/router';

import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {
  public selectedUrl: string;

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

    this.router.events.pipe(
        filter((e): e is NavigationEnd => e instanceof NavigationEnd),
      ).subscribe((event: NavigationEnd) => {
        this.selectedUrl = event.url;
      });
  }
}
