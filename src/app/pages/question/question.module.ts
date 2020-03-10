import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';
import { CommonPipesModule } from 'src/app/pipes/common-pipes.module';

import { QuestionPage } from './question.page';
import { QuestionHeaderComponent } from './question-header/question-header.component';
import { QuestionSkeletonComponent } from './question-skeleton/question-skeleton.component';
import { QuestionCardComponent } from './question-card/question-card.component';

import { VotingModule } from 'src/app/components/voting/voting.module';
import { UserCardModule } from 'src/app/components/user-card/user-card.module';
import { CommentModule } from 'src/app/components/comment/comment.module';
import { AnswerCardModule } from 'src/app/components/answer-card/answer-card.module';

const routes: Routes = [
  {
    path: '',
    component: QuestionPage
  }
];

@NgModule({
  declarations: [
    QuestionPage,
    QuestionSkeletonComponent,
    QuestionCardComponent,
    QuestionHeaderComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    CommonPipesModule,
    VotingModule,
    UserCardModule,
    AnswerCardModule,
    CommentModule,
  ],
  exports: [
    QuestionCardComponent,
    QuestionSkeletonComponent,
  ],
})
export class QuestionPageModule {}
