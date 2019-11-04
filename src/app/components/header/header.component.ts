import { Component, OnInit } from '@angular/core';

import { PopoverController } from '@ionic/angular';
import { MoreComponent } from './more/more.component';
import { filter } from 'rxjs/operators';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  public title: string;
  public inbox: number;
  public achievements: number;
  public reviwQueues: boolean;

  constructor(
    private router: Router,
    private popoverController: PopoverController,
  ) {}

  ngOnInit() {
    this.router.events
      .pipe(
        filter((event): event is NavigationEnd => event instanceof NavigationEnd),
      ).subscribe((event: NavigationEnd) => {
        const url = event.url;
        this.title = this.firstToUpper(url.split('/').pop());
      });

    this.inbox = 5;
    this.achievements = 120;
    this.reviwQueues = true;
  }

  public async showMore(event: any) {
    const popover = await this.popoverController.create({
      component: MoreComponent,
      translucent: true,
      event,
    });
    return await popover.present();
  }

  private firstToUpper(s: string): string {
    const first = s[0].toUpperCase();
    return first + s.slice(1, s.length);
  }
}
