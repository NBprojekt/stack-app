import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ErrorImageDirective } from './error-image/error-image.directive';

@NgModule({
  declarations: [
    ErrorImageDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ErrorImageDirective
  ]
})
export class SharedDirectivesModule {}
