import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { Routes, RouterModule } from '@angular/router';

import { TabsPage } from './tabs.page';
import { HeaderModule } from 'src/app/components/header/header.module';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children:  [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', loadChildren: () => import('./home/home.module').then( m => m.HomePageModule) },
      { path: 'search', loadChildren: () => import('./search/search.module').then( m => m.SearchPageModule) },
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
  ],
  declarations: [
    TabsPage,
  ]
})
export class TabsPageModule {}
