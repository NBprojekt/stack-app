import { Component, AfterViewInit } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { GuardsCheckStart, Router, NavigationEnd, NavigationCancel, RouterEvent } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements AfterViewInit {
  public loading: boolean;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router: Router,
  ) {
    this.initializeApp();
    this.loading = true;
  }

  ngAfterViewInit() {
    this.router.events
      .subscribe((event: RouterEvent) => {
        if (event instanceof GuardsCheckStart) {
          this.loading = true;
        } else if ( event instanceof NavigationEnd || event instanceof NavigationCancel) {
          this.loading = false;
        }
      });
}

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
