import { Component, OnInit, OnDestroy, ElementRef, ViewChild } from '@angular/core';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';

import { IUser } from 'src/app/interfaces/user';
import { UserService } from 'src/app/services/user/user.service';
import { IResponse } from 'src/app/interfaces/response';
import { IReputation } from 'src/app/interfaces/reputation';

@Component({
  selector: 'app-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],
})
export class UserPage implements OnInit, OnDestroy {
  @ViewChild('reputationChartCanvas', {static: false}) set content(elementRef: ElementRef<HTMLCanvasElement>) {
    if(elementRef) {
      console.log(elementRef);
      const context: CanvasRenderingContext2D = elementRef.nativeElement.getContext('2d');
      this.gradient = context.createLinearGradient(0, 0, 0, 600);

      this.gradient.addColorStop(0, 'green');
      this.gradient.addColorStop(1, 'white');
    }
  }

  public user: IUser;

  public chartReady: boolean;
  public reputationChart: {
    datasets: ChartDataSets[],
    options: ChartOptions,
    labels: Label[],
    chartType: ChartType,
  };

  public section: string;

  private destroy = new Subject<any>();
  private gradient: CanvasGradient;

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
    this.reputationChart = {
      datasets: null,
      options: null,
      labels: null,
      chartType: 'line',
    };

    this.reputationChart.datasets = [{
      data: [],
      label: 'Reputation',
      // TODO: Use Themeing service to tynamicly set the color
      borderColor: '#fe7f2d', // PRimary
      backgroundColor: '#f4f5f8', // Light
    }];

    let reputationSumm = 1;
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
