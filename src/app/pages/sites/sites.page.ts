import { Router } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';

import { AlertController } from '@ionic/angular';
import { InAppBrowser, InAppBrowserEvent, InAppBrowserObject } from '@ionic-native/in-app-browser/ngx';

import { SitesService } from 'src/app/services/sites/sites.service';
import { UserService } from 'src/app/services/user/user.service';

import { ISite, IMySite } from 'src/app/interfaces/site';
import { IResponse } from 'src/app/interfaces/response';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sites',
  templateUrl: './sites.page.html',
  styleUrls: ['./sites.page.scss'],
})
export class SitesPage implements OnInit, OnDestroy {
  public readonly maxItems = 20;
  public showItems: number;
  public searchString: string;

  public loading: boolean;
  public sites: Array<ISite>;
  private _sites: Array<ISite>;

  private browserSubscribtion$: Subscription;

  constructor(
    private siteService: SitesService,
    private inAppBrowser: InAppBrowser,
    private userService: UserService,
    private alertController: AlertController,
    private router: Router,
  ) {}

  public ngOnInit(): void {
    this.loading = true;
    this.showItems = this.maxItems;
    this.loadSites();
  }

  public ngOnDestroy(): void {
    if (this.browserSubscribtion$) {
      this.browserSubscribtion$.unsubscribe();
    }
  }

  public async openSite(site: ISite): Promise<void> {
    await this.siteService.setCurrentSite(site);
    this.router.navigateByUrl('/menu/pages/tabs/home');
  }

  public async joinSiteDialog(site: ISite): Promise<void> {
    const alert = await this.alertController.create({
      header: `Join ${site.name}?`,
      message: `Do you realy want to join ${site.name}?`,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        }, {
          text: 'Okay',
          handler: () => this.openJoinSite(site)
        }
      ]
    });

    await alert.present();
  }

  private openJoinSite(site): void {
    const browser: InAppBrowserObject = this.inAppBrowser.create(
      `${site.url}/users/join?returnurl=${site.url}/return`,
      '_blank', 'location=no,zoom=no,shouldPauseOnSuspend=yes,hidden=yes,beforeload=yes'
    );

    browser.insertCSS({ code: `
      body: { padding: 0 }
      header: { display: none; visibility: hidden }
    ` });

    this.browserSubscribtion$ = browser.on('loadstart').subscribe((event: InAppBrowserEvent) => {
      const url = event.url.toLowerCase();

      if (url.startsWith(`${site.url}/return`)) {
        browser.close();

        this.router.navigateByUrl('/menu/sites');

        this.browserSubscribtion$.unsubscribe();
      }
    });
  }

  private async loadSites(): Promise<void> {
    this.sites = await this.siteService.getAllSites();

    this.userService.getMySites().subscribe((response: IResponse) => {
      response.items.forEach((mySite: IMySite) => {
        const matchingIndex = this.sites.findIndex(s => s.site_url.toLowerCase() === mySite.site_url.toLowerCase());

        if (matchingIndex >= 0) {
          this.sites[matchingIndex].reputation = mySite.reputation;
          this.sites[matchingIndex].badge_counts = mySite.badge_counts;
        }
      });

      this.sites.sort((a, b) => (b.reputation || 0) - (a.reputation || 0));
      this._sites = this.sites;

      this.loading = false;
    });
  }

  public search(): void {
    const searchString = this.searchString ? this.searchString.toLowerCase() : '';
    this.sites = this._sites.filter((site: ISite) => site.name.toLocaleLowerCase().includes(searchString));
  }

  public resetFilter(): void {
    this.searchString = '';
    this.search();
  }

  public hasMore(): number {
    return this.sites ? this.sites.length - this.showItems : -1;
  }
  public showMore(): void {
    this.showItems += this.maxItems;
  }
}
