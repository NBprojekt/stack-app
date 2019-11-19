import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { CommonPipesModule } from 'src/app/pipes/common-pipes.module';

import { VotingComponent } from './voting.component';
import { VotingSkeletonComponent } from './voting-skeleton/voting-skeleton.component';

@NgModule({
  declarations: [
    VotingComponent,
    VotingSkeletonComponent,
  ],
  imports: [
    CommonModule,
    CommonPipesModule,
    IonicModule,
  ],
  exports: [
    VotingComponent,
    VotingSkeletonComponent,
  ]
})
export class VotingModule { }
