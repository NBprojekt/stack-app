import { Injectable } from '@angular/core';

import { ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

import { ISite } from 'src/app/interfaces/site';

@Injectable({
  providedIn: 'root'
})
export class SitesService {
  private site: ISite;

  constructor(
    private storage: Storage,
    private toastController: ToastController,
  ) {}

  public getCurrentSite(): any | Promise<any> {
    return this.site ? this.site : this.storage.get('current_site');
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
    return new Promise(async (resolve) => {
      this.site = await this.storage.get('current_site');
      resolve();
    });
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
