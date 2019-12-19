import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { JobsPage } from './jobs.page';

import { ComingSoonModule } from 'src/app/components/coming-soon/coming-soon.module';

const routes: Routes = [
  {
    path: '',
    component: JobsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    ComingSoonModule,
  ],
  declarations: [JobsPage]
})
export class JobsPageModule {}
