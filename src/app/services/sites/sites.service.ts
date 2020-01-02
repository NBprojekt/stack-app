import { Injectable } from '@angular/core';

import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class SitesService {
  private site: any;

  constructor(
    private storage: Storage,
  ) {}

  public getCurrentSite(): any | Promise<any> {
    return this.site ? this.site : this.storage.get('current_site');
  }

  public async setCurrentSite(site: any): Promise<void> {
    return new Promise(async (resolve) => {
      this.site = site;
      await this.storage.set('current_site', site);
      console.log(`New Site is now ${site.name}`)
      resolve();
    });

  }

  public async ready(): Promise<void> {
    return new Promise(async (resolve) => {
      this.site = await this.storage.get('current_site');
      resolve();
    });
  }
}
