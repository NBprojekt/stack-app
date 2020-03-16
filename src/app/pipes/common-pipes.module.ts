import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShortenNumberPipe } from './shorten-number/shorten-number.pipe';
import { TimePassedPipe } from './time-passed/time-passed.pipe';
import { SnakeToHumanPipe } from './snake-to-human/snake-to-human.pipe';

@NgModule({
  imports: [CommonModule],
  declarations: [
    ShortenNumberPipe,
    TimePassedPipe,
    SnakeToHumanPipe,
  ],
  exports: [
    ShortenNumberPipe,
    TimePassedPipe,
    SnakeToHumanPipe,
  ]
})
export class CommonPipesModule { }
