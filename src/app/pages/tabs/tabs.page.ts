import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';


@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit, OnDestroy{
  public currentUrl: string;
  private destroy = new Subject<any>();

  constructor(
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.currentUrl = '';

    this.router.events
      .pipe(
        filter((event): event is NavigationEnd => event instanceof NavigationEnd),
        takeUntil(this.destroy),
      ).subscribe((event: NavigationEnd) => {
        const url = event.url.split('/');
        this.currentUrl = url[url.length - 1];
      });
  }

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }
}
