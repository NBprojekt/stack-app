import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'snakeToHuman'
})
export class SnakeToHumanPipe implements PipeTransform {

  transform(s: string): any {
    const words = s.split('_');
    words[0] = this.firstToUpper(words[0]);
    return words.join(' ');
  }

  private firstToUpper(s: string): string {
    return s[0].toUpperCase() + s.slice(1, s.length);
  }
}
