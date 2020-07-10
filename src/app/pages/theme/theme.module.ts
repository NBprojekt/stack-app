import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';

import { Routes, RouterModule } from '@angular/router';

import { ThemePage } from '../theme/theme.page';
import { CommonDirectivesModule } from 'src/app/directives/common-directives.module';
import { CommonPipesModule } from 'src/app/pipes/common-pipes.module';
import { IconsModule } from 'src/app/icons/icons.module';

const routes: Routes = [
  { path: '', component: ThemePage },
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    CommonDirectivesModule,
    CommonPipesModule,
    IconsModule,
  ],
  declarations: [
    ThemePage,
  ],
})
export class ThemePageModule {}
