import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { HeaderComponent } from './header.component';
import { MoreComponent } from './more/more.component';

@NgModule({
  declarations: [
    HeaderComponent,
    MoreComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
  ],
  exports: [
    HeaderComponent,
  ],
  entryComponents: [
    MoreComponent,
  ]
})
export class HeaderModule { }
