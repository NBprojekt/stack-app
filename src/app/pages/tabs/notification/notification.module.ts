import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { NotificationPage } from './notification.page';
import { CommonPipesModule } from 'src/app/pipes/common-pipes.module';
import { IconsModule } from 'src/app/icons/icons.module';

const routes: Routes = [
  {
    path: '',
    component: NotificationPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    CommonPipesModule,
    IconsModule,
  ],
  declarations: [NotificationPage]
})
export class NotificationPageModule {}
