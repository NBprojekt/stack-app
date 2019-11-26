import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';

import { Routes, RouterModule } from '@angular/router';

import { MenuPage } from './menu.page';
import { CommonDirectivesModule } from 'src/app/directives/common-directives.module';

const routes: Routes = [
  {
    path: 'pages',
    component: MenuPage,
    children:  [
      { path: '', loadChildren: () => import('../tabs/tabs.module').then( m => m.TabsPageModule) },
      { path: 'question/:id/:title', loadChildren: () => import('../question/question.module').then( m => m.QuestionPageModule) },
    ],
  },
  { path: 'settings', loadChildren: () => import('../settings/settings.module').then( m => m.SettingsPageModule) },
  { path: 'about', loadChildren: () => import('../about/about.module').then( m => m.AboutPageModule) },
  { path: '', redirectTo: 'pages', pathMatch: 'full'}
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
    MenuPage,
  ],
})
export class MenuPageModule {
}
