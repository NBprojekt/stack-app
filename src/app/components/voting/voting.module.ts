import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VotingComponent } from './voting.component';
import { CommonPipesModule } from 'src/app/pipes/common-pipes.module';



@NgModule({
  declarations: [
    VotingComponent,
  ],
  imports: [
    CommonModule,
    CommonPipesModule,
  ],
  exports: [
    VotingComponent,
  ]
})
export class VotingModule { }
