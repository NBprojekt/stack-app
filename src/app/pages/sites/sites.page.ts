import { Component, OnInit } from '@angular/core';

import { SitesService } from 'src/app/services/sites/sites.service';
import { UserService } from 'src/app/services/user/user.service';

import { ISite, IMySite } from 'src/app/interfaces/site';
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
      response.items.forEach((mySite: IMySite) => {
        const matchingIndex = this.sites.findIndex(s => s.site_url.toLowerCase() === mySite.site_url.toLowerCase());

        if (matchingIndex >= 0) {
          this.sites[matchingIndex].reputation = mySite.reputation;
        }
      });

      this.sites.sort((a, b) => (b.reputation || 0) - (a.reputation || 0));
    });
  }
}
