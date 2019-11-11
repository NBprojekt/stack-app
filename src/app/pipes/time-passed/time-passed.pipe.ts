import { Pipe, PipeTransform } from '@angular/core';

import * as moment from 'moment';

@Pipe({
  name: 'timePassed'
})
export class TimePassedPipe implements PipeTransform {

  transform(unixTimestamp: number): string {
    const date = moment.unix(unixTimestamp);
    const now = moment();

    const diffInSeconds = now.diff(date, 'seconds');
    const diffInMinutes = now.diff(date, 'minutes');
    const diffInHours = now.diff(date, 'hours');

    const diffInDays = now.diff(date, 'days');
    const diffInWeeks = now.diff(date, 'weeks');
    const diffInMonths = now.diff(date, 'months');
    const diffInYears = now.diff(date, 'years');

    switch (true) {
      case (diffInMonths > 14): return `${diffInYears} years, ${diffInMonths - diffInYears * 12} months ago`;
      case (diffInMonths > 2): return `${diffInMonths} months ago`;
      case (diffInWeeks > 2): return `${diffInWeeks} weeks ago`;
      case (diffInDays > 1): return `${diffInDays} days ago`;
      case (diffInDays === 1): return `yesterday`;
      case (diffInHours > 11): return `today`;
      case (diffInHours >= 1): return `${diffInHours} hours ago`;
      case (diffInMinutes >= 1): return `${diffInMinutes} min ago`;
      case (diffInSeconds >= 0): return `${diffInSeconds} secs ago`;
    }
  }

}
