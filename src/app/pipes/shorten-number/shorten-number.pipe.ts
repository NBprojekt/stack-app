import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shortenNumber'
})
export class ShortenNumberPipe implements PipeTransform {

  // TODO: Redesign / rethink the transform
  transform(value: number): string {
    if (!value) { return '0'; }
    const x = value.toString();

    switch (x.length) {
      case 4: return `${x[0]}.${x[1]}k`;
      case 5: return `${x.slice(0, 2)}.${x[2]}k`;
      case 6: return `${x.slice(0, 3)}k`;
      case 7: return `${x[0]}.${x[1]}m`;
      case 8: return `${x.slice(0, 2)}.${x[2]}m`;
      case 9: return `${x.slice(0, 3)}m`;
      case 10: return `${x[0]}.${x[1]}m`;
      case 11: return `${x.slice(0, 2)}.${x[2]}m`;
      case 12: return `${x.slice(0, 3)}m`;

      default: return x;
    }
  }
}
