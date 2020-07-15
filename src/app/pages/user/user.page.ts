import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { UserService } from 'src/app/services/user/user.service';

import { IUser } from 'src/app/interfaces/user';
import { IResponse } from 'src/app/interfaces/response';
import { IReputation } from 'src/app/interfaces/reputation';
import { IChart } from 'src/app/interfaces/chart';

import * as moment from 'moment';
import { LinearTickOptions } from 'chart.js';
import { environment } from 'src/environments/environment';

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

  private readonly pageLimit: number = 1; // Page limit for reputation requests
  private destroy = new Subject<any>();

  constructor(
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    const userId = this.activatedRoute.snapshot.paramMap.get('id');

    if (userId === 'me') {
      this.userService.userChanged
        .pipe(
          takeUntil(this.destroy)
        ).subscribe(
          () => this.getMe()
        );

      this.getMe().then(() => this.loadReputation());
    } else {
      this.userService.getUser(+userId).subscribe((response) => {
        this.user = response.items[0];
        this.loadReputation(+userId);
      });
    }

    this.section = 'profile';
  }

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }

  private async getMe(): Promise<void> {
    this.user = await this.userService.getMe();
  }

  private loadReputation(userId?: number, page?: number, reputations?: Array<IReputation>): void {
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

    (userId ? this.userService.getUserReputationHistory(userId, {page}) : this.userService.getMyFullReputationHistory({page}))
      .pipe(takeUntil(this.destroy))
      .subscribe((response: IResponse) => {
        reputations.push(...response.items);

        if (response.has_more && page < this.pageLimit) {
          this.loadReputation(userId, page, reputations);
        } else {
          reputations.push({
            reputation_history_type: 'start_value',
            creation_date: reputations[reputations.length-1].creation_date-1,
            reputation_change: 0,
            reputation_summ: 1
          });
          this.showReputation(reputations);
        }
      });
  }

  private showReputation(reputations: Array<IReputation>): void {
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
            display: !environment.production,
          },
        }],
        yAxes: [{
          gridLines: {
            display: !environment.production,
          },
          ticks: {
            precision: 0, // Unknown in type TickOptions
          }
        }]
      },
    };

    this.reputationChart.labels = new Array(this.reputationChart.datasets[0].data.length).fill('');
    this.chartReady = true;
  }
}
