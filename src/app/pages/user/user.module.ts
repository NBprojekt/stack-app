import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { UserPage } from '../user/user.page';
import { CommonDirectivesModule } from 'src/app/directives/common-directives.module';
import { ReputationChartModule } from 'src/app/components/reputation-chart/reputation-chart.module';
import { CommonPipesModule } from 'src/app/pipes/common-pipes.module';
import { IconsModule } from 'src/app/icons/icons.module';

const routes: Routes = [
  { path: '', component: UserPage },
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    CommonPipesModule,
    CommonDirectivesModule,
    ReputationChartModule,
    IconsModule,
  ],
  declarations: [
    UserPage,
  ],
})
export class UserPageModule {}
