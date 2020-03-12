import { Component, OnInit } from '@angular/core';

import { SitesService } from 'src/app/services/sites/sites.service';
import { UserService } from 'src/app/services/user/user.service';

import { ISite } from 'src/app/interfaces/site';
import { IResponse } from 'src/app/interfaces/response';

@Component({
  selector: 'app-sites',
  templateUrl: './sites.page.html',
  styleUrls: ['./sites.page.scss'],
})
export class SitesPage implements OnInit {
  public sites: Array<ISite>;

  constructor(
    private siteService: SitesService,
    private userService: UserService,
  ) {}

  public ngOnInit(): void {
    this.loadSites();
  }

  private async loadSites(): Promise<void> {
    this.sites = await this.siteService.getAllSites();

    this.userService.getMySites().subscribe((response: IResponse) => {
      console.log(['SITES', this.sites, 'MY SITES', response.items]);

      response.items.forEach((mySite: {site_name: string, reputation: number}) => {
        const matchingIndex = this.sites.findIndex(s => s.name === mySite.site_name);
        if (matchingIndex >= 0) {
          this.sites[matchingIndex].reputation = mySite.reputation;
        }
      });

      this.sites.sort((a, b) => (b.reputation || 0) - (a.reputation || 0));

      console.log(['SORTED SITES ARRAY', this.sites]);
    });
  }
}
