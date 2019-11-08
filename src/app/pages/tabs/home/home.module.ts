import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { HomePage } from './home.page';
import { FeedComponent } from './feed/feed.component';

import { CommonPipesModule } from 'src/app/pipes/common-pipes.module';

const routes: Routes = [
  {
    path: '',
    component: HomePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    CommonPipesModule
  ],
  declarations: [
    HomePage,
    FeedComponent,
  ],
})
export class HomePageModule {}
