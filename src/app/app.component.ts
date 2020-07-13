import { Component, AfterViewInit } from '@angular/core';

import { GuardsCheckStart, Router, NavigationEnd, NavigationCancel, RouterEvent } from '@angular/router';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Storage } from '@ionic/storage';
import { SitesService } from './services/sites/sites.service';

import { BehaviorSubject } from 'rxjs';
import { ThemeService } from './services/theme/theme.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements AfterViewInit {
  public static loading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  public loading: boolean;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private store: Storage,
    private router: Router,
    private siteService: SitesService,
    private themeService: ThemeService,
  ) {
    this.initializeApp();
    AppComponent.loading.subscribe(loading => this.loading = loading);
  }

  ngAfterViewInit() {
    this.router.events
      .subscribe((event: RouterEvent) => {
        if (event instanceof GuardsCheckStart) {
          AppComponent.loading.next(true);
        } else if ( event instanceof NavigationEnd || event instanceof NavigationCancel) {
          AppComponent.loading.next(false);
        }
      });
  }

  private async initializeApp() {
    await Promise.all([
        this.platform.ready(),
        this.store.ready(),
        this.siteService.ready(),
      ]).then(() => {
        this.statusBar.styleDefault();
        this.splashScreen.hide();
      }).catch(error => {
        console.error('Cann not initialize the App', error);
      });
  }
}
