import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AnswerCardComponent } from './answer-card.component';
import { IonicModule } from '@ionic/angular';

@NgModule({
  declarations: [
    AnswerCardComponent,
  ],
  imports: [
    CommonModule,
    IonicModule,
  ],
  exports: [
    AnswerCardComponent,
  ]
})
export class AnswerCardModule { }
