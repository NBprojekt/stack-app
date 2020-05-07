import { Component, OnInit, Input} from '@angular/core';
import { IChart } from 'src/app/interfaces/chart';

@Component({
  selector: 'reputation-chart',
  templateUrl: './reputation-chart.component.html',
  styleUrls: ['./reputation-chart.component.scss'],
})
export class ReputationChartComponent implements OnInit {
  @Input() show: boolean;
  @Input() chart: IChart;

  constructor() { }

  ngOnInit() {}

}
