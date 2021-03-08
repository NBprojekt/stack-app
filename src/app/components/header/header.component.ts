import { SitesService } from './../../services/sites/sites.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { PopoverController, ModalController } from '@ionic/angular';

import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';

import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  public title: string;
  public icon: string;
  public reviewQueues: boolean;

  private destroy = new Subject<any>();

  constructor(
    private router: Router,
    private popoverController: PopoverController,
    private modalController: ModalController,
    private sitesService: SitesService,
  ) {}

  ngOnInit(): void {
    this.loadPageTitle();
  }

  public loadPageTitle(): void {
    this.router.events
      .pipe(
        filter((event): event is NavigationEnd => event instanceof NavigationEnd),
        takeUntil(this.destroy)
      ).subscribe((event: NavigationEnd) => {
        const url = this.router.url;
        this.title = this.firstToUpper(url.split('/').pop()) || 'Undefined';
        this.icon = this.sitesService.getCurrentSite().high_resolution_icon_url;
      });
  }

  public firstToUpper(s: string): string {
    const first = s[0].toUpperCase();
    return first + s.slice(1, s.length);
  }
}
