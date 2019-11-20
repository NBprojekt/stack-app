import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AnswerCardComponent } from './answer-card.component';
import { IonicModule } from '@ionic/angular';
import { UserCardModule } from '../user-card/user-card.module';
import { VotingModule } from '../voting/voting.module';

@NgModule({
  declarations: [
    AnswerCardComponent,
  ],
  imports: [
    CommonModule,
    IonicModule,
    UserCardModule,
    VotingModule,
  ],
  exports: [
    AnswerCardComponent,
  ]
})
export class AnswerCardModule { }
