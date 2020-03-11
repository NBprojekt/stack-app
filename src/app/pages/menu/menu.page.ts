import { Component, OnInit, OnDestroy } from '@angular/core';

import { Router, NavigationEnd } from '@angular/router';

import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';

import { UserService } from 'src/app/services/user/user.service';
import { IUser } from 'src/app/interfaces/user';
import { IResponse } from 'src/app/interfaces/response';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit, OnDestroy {
  public selectedUrl: string;
  public myProfile: IUser;

  private destroy = new Subject<any>();

  public pages = [
    {
        title: 'Profile',
        url: 'null',
        icon: 'person',
        routerDirection: 'forward',
        lines: 'none',
    },
    {
        title: 'Stacks',
        url: 'null',
        icon: 'albums',
        routerDirection: 'forward',
        lines: 'none',
    },
    {
        title: 'Display',
        url: 'null',
        icon: 'color-palette',
        routerDirection: 'forward',
        lines: 'full',
    },
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
        routerDirection: 'forward',
        lines: 'none',
    },
  ];

  constructor(
    private router: Router,
    private userService: UserService,
  ) {}

  ngOnInit(): void {
    this.selectedUrl = '';

    this.router.events
      .pipe(
        filter((event): event is NavigationEnd => event instanceof NavigationEnd),
        takeUntil(this.destroy),
      ).subscribe((event: NavigationEnd) => {
        this.selectedUrl = event.url;
      });

    this.loadMyProfile();
  }

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }

  private loadMyProfile(): void {
    this.userService.getMe().subscribe((response: IResponse) => {
      this.myProfile = response.items[0] as IUser;
      console.log(['My Userprofile', this.myProfile]);
    });
  }
}
