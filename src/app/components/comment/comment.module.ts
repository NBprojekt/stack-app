import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

import { CommonPipesModule } from 'src/app/pipes/common-pipes.module';

import { CommentComponent } from './comment.component';

@NgModule({
  declarations: [
    CommentComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CommonPipesModule,
  ],
  exports: [
    CommentComponent,
  ]
})
export class CommentModule { }
