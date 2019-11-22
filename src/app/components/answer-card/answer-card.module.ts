import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { AnswerCardComponent } from './answer-card.component';
import { UserCardModule } from '../user-card/user-card.module';
import { VotingModule } from '../voting/voting.module';
import { CommentModule } from '../comment/comment.module';

@NgModule({
  declarations: [
    AnswerCardComponent,
  ],
  imports: [
    CommonModule,
    IonicModule,
    UserCardModule,
    VotingModule,
    CommentModule,
  ],
  exports: [
    AnswerCardComponent,
  ]
})
export class AnswerCardModule { }
