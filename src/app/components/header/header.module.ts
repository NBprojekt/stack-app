import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { HeaderComponent } from './header.component';
import { NotificationComponent } from './notification/notification.component';

import { CommonPipesModule } from 'src/app/pipes/common-pipes.module';

@NgModule({
  declarations: [
    HeaderComponent,
    NotificationComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CommonPipesModule,
  ],
  exports: [
    HeaderComponent,
  ],
  entryComponents: [
    NotificationComponent,
  ]
})
export class HeaderModule { }
