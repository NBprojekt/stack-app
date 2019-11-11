import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShortenNumberPipe } from './shorten-number/shorten-number.pipe';
import { TimePassedPipe } from './time-passed/time-passed.pipe';

@NgModule({
  imports: [CommonModule],
  declarations: [
    ShortenNumberPipe,
    TimePassedPipe,
  ],
  exports: [
    ShortenNumberPipe,
    TimePassedPipe,
  ]
})
export class CommonPipesModule { }
