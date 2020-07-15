import { Component, OnInit, OnDestroy, ElementRef, ViewChild } from '@angular/core';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { UserService } from 'src/app/services/user/user.service';

import { IUser } from 'src/app/interfaces/user';
import { IResponse } from 'src/app/interfaces/response';
import { IReputation } from 'src/app/interfaces/reputation';
import { IChart } from 'src/app/interfaces/chart';

@Component({
  selector: 'app-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],
})
export class UserPage implements OnInit, OnDestroy {
  public readonly iconSize: string = '30px';
  public user: IUser;

  public chartReady: boolean;
  public reputationChart: IChart;

  public section: string;

  private destroy = new Subject<any>();

  constructor(
    private userService: UserService,
  ) {}

  ngOnInit(): void {
    this.userService.userChanged
      .pipe(
        takeUntil(this.destroy)
      ).subscribe(
        () => this.getMe()
      );

    this.loadReputation();

    this.section = 'profile';
  }

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }

  private async getMe(): Promise<void> {
    this.user = await this.userService.getMe();
  }

  private loadReputation(page?: number, reputations?: Array<IReputation>): void {
    // TODO: Limit history to last 4 reputation pages
    this.chartReady = false;

    if (!page) {
      page = 0;
    }
    page++;

    if (!reputations) {
      reputations = new Array<IReputation>();
    }

    this.userService
      .getMyFullReputationHistory({page})
      .pipe(takeUntil(this.destroy))
      .subscribe((response: IResponse) => {
        reputations.push(...response.items);

        if (response.has_more) {
          this.loadReputation(page, reputations);
        } else {
          this.showReputation(reputations);
        }
      });
  }

  private showReputation(reputations: Array<IReputation>): void {
    console.log(['REPUTATION', reputations]);

    this.reputationChart = {
      datasets: null,
      options: null,
      labels: null,
      chartType: 'line',
    };

    this.reputationChart.datasets = [{
      data: [],
      label: 'Reputation',
      borderColor: getComputedStyle(document.body).getPropertyValue('--ion-color-primary'),
      backgroundColor: `rgba(${getComputedStyle(document.body).getPropertyValue('--ion-color-primary-rgb')}, .2)`,
    }];

    // Ensure the user always starts with 1 reputation
    let reputationSumm = 1;
    this.reputationChart.datasets[0].data.push(reputationSumm);

    reputations.forEach((reputation: IReputation) => {
      reputationSumm += reputation.reputation_change;
      this.reputationChart.datasets[0].data.push(reputationSumm);
    });

    this.reputationChart.options = {
      responsive: true,
      legend: {
         display: false
      },
      elements: {
        point:{
          radius: 0,
        }
      },
      scales: {
        xAxes: [{
          gridLines: {
            display:false
          },
        }],
        yAxes: [{
          gridLines: {
            display:false
          },
        }]
      },
    };

    this.reputationChart.labels = new Array(this.reputationChart.datasets[0].data.length).fill('');
    this.chartReady = true;
  }
}
