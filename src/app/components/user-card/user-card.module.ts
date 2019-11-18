import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { CommonPipesModule } from 'src/app/pipes/common-pipes.module';
import { CommonDirectivesModule } from 'src/app/directives/common-directives.module';

import { UserCardComponent } from './user-card.component';

@NgModule({
  declarations: [
    UserCardComponent,
  ],
  imports: [
    CommonModule,
    CommonPipesModule,
    CommonDirectivesModule,
    IonicModule,
  ],
  exports: [
    UserCardComponent
  ]
})
export class UserCardModule { }
