import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { Routes, RouterModule } from '@angular/router';

import { TabsPage } from './tabs.page';
import { HeaderModule } from 'src/app/components/header/header.module';
import { IconsModule } from 'src/app/icons/icons.module';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children:  [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', loadChildren: () => import('./home/home.module').then( m => m.HomePageModule) },
      { path: 'search', loadChildren: () => import('./search/search.module').then( m => m.SearchPageModule) },
      { path: 'jobs', loadChildren: () => import('./jobs/jobs.module').then( m => m.JobsPageModule) },
    ],
  },
  { path: '', redirectTo: 'tabs/home', pathMatch: 'full'}
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    HeaderModule,
    IconsModule
  ],
  declarations: [
    TabsPage,
  ]
})
export class TabsPageModule {}
