import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { QuestionPage } from './question.page';
import { CommonPipesModule } from 'src/app/pipes/common-pipes.module';
import { VotingModule } from 'src/app/components/voting/voting.module';

const routes: Routes = [
  {
    path: '',
    component: QuestionPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    CommonPipesModule,
    VotingModule
  ],
  declarations: [
    QuestionPage,
  ]
})
export class QuestionPageModule {}
