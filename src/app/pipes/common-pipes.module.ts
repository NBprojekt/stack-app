import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShortenNumberPipe } from './shorten-number/shorten-number.pipe';

@NgModule({
  imports: [CommonModule],
  declarations: [
    ShortenNumberPipe
  ],
  exports: [
    ShortenNumberPipe
  ]
})
export class CommonPipesModule { }
