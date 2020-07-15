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
      reputations.push({
        reputation_history_type: 'current_value',
        creation_date: moment().unix(),
        reputation_change: 0,
        reputation_summ: this.user.reputation
      });
    }

    this.userService
      .getMyFullReputationHistory({page})
      .pipe(takeUntil(this.destroy))
      .subscribe((response: IResponse) => {
        reputations.push(...response.items);

        if (response.has_more && page < this.pageLimit) {
          this.loadReputation(userId, page, reputations);
        } else {
          reputations.push({
            reputation_history_type: 'current_value',
            creation_date: reputations[reputations.length-1].creation_date-1,
            reputation_change: 0,
            reputation_summ: this.user.reputation
          });
          this.showReputation(reputations);
        }
      });
  }

  private showReputation(reputations: Array<IReputation>): void {
    console.log(['REPUTATION', reputations]);
    let reputationSumm = reputations[0].reputation_summ;

    // Map reputation change to summ reputation at the given time, not just the change
    reputations.map((reputation: IReputation) => {
      reputation.reputation_summ = reputationSumm;
      reputationSumm -= reputation.reputation_change;
    });

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
    reputations.reverse().forEach((reputation: IReputation) => {
      this.reputationChart.datasets[0].data.push(reputation.reputation_summ);
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
            display: false,
          },
        }],
        yAxes: [{
          gridLines: {
            display:false
            display: false,
          },
        }]
      },
    };

    this.reputationChart.labels = new Array(this.reputationChart.datasets[0].data.length).fill('');
    this.chartReady = true;
  }
}
