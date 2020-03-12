import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { IResponse } from 'src/app/interfaces/response';

import { ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

import { AuthService } from '../auth/auth.service';

import { ISite } from 'src/app/interfaces/site';

import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class SitesService {
  private readonly url = environment.api.url + environment.api.version;
  private site: ISite;

  constructor(
    private http: HttpClient,
    private storage: Storage,
    private toastController: ToastController,
  ) {}

  public getCurrentSite(): any | Promise<any> {
    return this.site ? this.site : this.storage.get('current_site');
  }

  public async getAllSites(): Promise<Array<ISite>> {
    const sites: Array<ISite> = await this.storage.get('all_sites');
    this.checkForSitesUpdate();

    return sites;
  }

  public async setCurrentSite(site: ISite): Promise<void> {
    return new Promise(async (resolve) => {
      if (this.site.api_site_parameter !== site.api_site_parameter) {
        this.site = site;
        await this.storage.set('current_site', site);
        this.showSiteChanged(this.site);
      }
      resolve();
    });

  }

  public async ready(): Promise<void> {
    this.checkForSitesUpdate();

    return new Promise(async (resolve) => {
      this.site = await this.storage.get('current_site');

      // TODO: Load a site from the user profile. This is just assuming that the user use stack overflow.
      if (!this.site) {
        this.site = {
          api_site_parameter: 'stackoverflow',
          high_resolution_icon_url: 'https://cdn.sstatic.net/Sites/stackoverflow/img/apple-touch-icon@2.png',
          name: 'Stack Overflow',
          styling: {
            tag_background_color: '#E0EAF1',
            tag_foreground_color: '#3E6D8E',
            link_color: '#0077CC'
          }
        };
      }

      resolve();
    });
  }

  private async checkForSitesUpdate(): Promise<void> {
    const lastSitesUpdate = await this.storage.get('all_sites_updated');

    if (!lastSitesUpdate ||
        moment().diff(moment(lastSitesUpdate, 'DD.MM.YYYY'), 'day') > environment.api.updateSitesIntervall
    ) {
      console.log(['UPDATING SITES', lastSitesUpdate, moment().diff(moment(lastSitesUpdate, 'DD.MM.YYYY'), 'days')]);
      this.loadAllSites();
    }
  }

  private loadAllSites(page?: number, sites?: Array<ISite>): void {
    if (!page) {
      page = 0;
    }
    page++;

    if (!sites) {
      sites = [];
    }

    const headers = new HttpHeaders()
      .set('Accept', '*/*');

    const params = new HttpParams()
      .set('page', page.toString())
      .set('pagesize', '100')
      .set('filter', '!2*nWMn6hVBih4WT7OAXU5');

    this.http
      .get<IResponse>(`${this.url}sites`, {headers, params})
      .subscribe((response: IResponse) => {
        sites.push(...response.items);

        if (response.has_more) {
          this.loadAllSites(page, sites);
        } else {
          this.saveSites(sites);
        }
      });

  }

  private async saveSites(sites: Array<ISite>): Promise<void> {
    console.log([`SITES STORED: ${sites.length}`, sites]);

    await this.storage.set('all_sites_updated', moment().format('DD.MM.YYYY'));
    await this.storage.set('all_sites', sites);
  }

  private async showSiteChanged(site: ISite): Promise<void> {
    const toast = await this.toastController.create({
      message: `Site changed to ${site.name}`,
      position: 'top',
      duration: 2000,
      cssClass: 'icon-toast',
      buttons: [{
        text: 'OK',
        role: 'cancel',
      }],
    });

    toast.present();
  }
}
