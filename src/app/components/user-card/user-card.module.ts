import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { CommonPipesModule } from 'src/app/pipes/common-pipes.module';
import { CommonDirectivesModule } from 'src/app/directives/common-directives.module';

import { UserCardComponent } from './user-card.component';
import { UserCardSkeletonComponent } from './user-card-skeleton/user-card-skeleton.component';

@NgModule({
  declarations: [
    UserCardComponent,
    UserCardSkeletonComponent,
  ],
  imports: [
    CommonModule,
    CommonPipesModule,
    CommonDirectivesModule,
    IonicModule,
  ],
  exports: [
    UserCardComponent,
    UserCardSkeletonComponent,
  ]
})
export class UserCardModule { }
