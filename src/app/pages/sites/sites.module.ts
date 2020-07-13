import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';

import { Routes, RouterModule } from '@angular/router';

import { SitesPage } from '../sites/sites.page';
import { CommonDirectivesModule } from 'src/app/directives/common-directives.module';
import { IconsModule } from 'src/app/icons/icons.module';

const routes: Routes = [
  { path: '', component: SitesPage },
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    CommonDirectivesModule,
    IconsModule,
  ],
  declarations: [
    SitesPage,
  ],
})
export class SitesPageModule {}
