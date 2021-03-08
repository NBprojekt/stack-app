import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { SearchPage } from './search.page';
import { IconsModule } from 'src/app/icons/icons.module';
import { CommonPipesModule } from 'src/app/pipes/common-pipes.module';
import { SearchHelpComponent } from './search-help/search-help.component';

const routes: Routes = [
  {
    path: '',
    component: SearchPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    IconsModule,
    CommonPipesModule,
  ],
  declarations: [
    SearchPage,
    SearchHelpComponent,
  ]
})
export class SearchPageModule {}
