import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

import { AlertController } from '@ionic/angular';

import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';

import { IUser } from 'src/app/interfaces/user';
import { UserService } from 'src/app/services/user/user.service';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit, OnDestroy {
  public selectedUrl: string;
  public myProfile: IUser;

  private destroy = new Subject<any>();

  // TODO: Need to refactor the pages array
  public pages = [
    {
        title: 'Profile',
        url: '/menu/user',
        icon: 'person',
        routerDirection: 'forward',
        lines: 'none',
    },
    {
        title: 'Sites',
        url: '/menu/sites',
        icon: 'albums',
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
        lines: 'full',
    },
  ];

  constructor(
    private router: Router,
    private userService: UserService,
    private authService: AuthService,
    private alertController: AlertController,
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

    this.userService.userChanged
      .pipe(
        takeUntil(this.destroy)
      ).subscribe(() => {
        this.getMe();
      });
  }

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }

  public async logOut(): Promise<void> {
    const alert = await this.alertController.create({
      header: 'Log out of Stack App?',
      message: 'You can allways log back in any time.',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        }, {
          text: 'Log out',
          handler: () => this.authService.logOut(),
        }
      ]
    });

    await alert.present();
  }

  private async getMe(): Promise<void> {
    this.myProfile = await this.userService.getMe();
  }
}
