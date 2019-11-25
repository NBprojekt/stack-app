import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { HeaderComponent } from './header.component';
import { MoreComponent } from './more/more.component';
import { NotificationComponent } from './notification/notification.component';

import { CommonPipesModule } from 'src/app/pipes/common-pipes.module';

@NgModule({
  declarations: [
    HeaderComponent,
    MoreComponent,
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
    MoreComponent,
    NotificationComponent,
  ]
})
export class HeaderModule { }
