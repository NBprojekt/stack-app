import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';

import { Routes, RouterModule } from '@angular/router';

import { AboutPage } from '../about/about.page';
import { CommonDirectivesModule } from 'src/app/directives/common-directives.module';

const routes: Routes = [
  { path: '', component: AboutPage },
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    CommonDirectivesModule,
  ],
  declarations: [
    AboutPage,
  ],
})
export class AboutPageModule {
}
