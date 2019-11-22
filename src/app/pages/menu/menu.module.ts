import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';

import { Routes, RouterModule } from '@angular/router';

import { MenuPage } from './menu.page';
import { SettingsComponent } from './settings/settings.component';
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
  { path: 'settings', component: SettingsComponent },
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
    SettingsComponent,
  ],
})
export class MenuPageModule {
}
