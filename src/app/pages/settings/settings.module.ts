import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';

import { Routes, RouterModule } from '@angular/router';

import { SettingsPage } from '../settings/settings.page';
import { CommonDirectivesModule } from 'src/app/directives/common-directives.module';

const routes: Routes = [
  { path: '', component: SettingsPage },
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
    SettingsPage,
  ],
})
export class SettingsPageModule {
}
