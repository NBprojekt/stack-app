import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';

export interface IChart {
  datasets: ChartDataSets[];
  options: ChartOptions;
  labels: Label[];
  chartType: ChartType;
}
