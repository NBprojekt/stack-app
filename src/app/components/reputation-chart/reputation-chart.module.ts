import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { ChartsModule } from 'ng2-charts';

import { CommonPipesModule } from 'src/app/pipes/common-pipes.module';
import { ReputationChartComponent } from './reputation-chart.component';

@NgModule({
  declarations: [
    ReputationChartComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CommonPipesModule,
    ChartsModule,
  ],
  exports: [
    ReputationChartComponent,
  ],
})
export class ReputationChartModule { }
