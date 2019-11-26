import { TimePassedPipe } from './time-passed.pipe';

import * as moment from 'moment';

describe('TimePassedPipe', () => {
  let pipe: TimePassedPipe;

  beforeEach(() => {
    pipe = new TimePassedPipe();
  });

  it('Should create', () => {
    expect(pipe).toBeTruthy();
  });

  describe('Should format', () => {
    it('seconds ago', () => {
      const unixTimestamp = moment().unix();
      expect(pipe.transform(unixTimestamp)).toContain('secs ago');
    });

    it('minutes ago', () => {
      const unixTimestamp = moment().subtract(5, 'minutes').unix();
      expect(pipe.transform(unixTimestamp)).toContain('min ago');
    });

    it('hours ago', () => {
      const unixTimestamp = moment().subtract(2, 'hours').unix();
      expect(pipe.transform(unixTimestamp)).toContain('hours ago');
    });

    it('today', () => {
      const unixTimestamp = moment().subtract(12, 'hours').unix();
      expect(pipe.transform(unixTimestamp)).toContain('today');
    });

    it('yesterday', () => {
      const unixTimestamp = moment().subtract(1, 'days').unix();
      expect(pipe.transform(unixTimestamp)).toContain('yesterday');
    });

    it('days ago', () => {
      const unixTimestamp = moment().subtract(3, 'days').unix();
      expect(pipe.transform(unixTimestamp)).toContain('days ago');
    });

    it('weeks ago', () => {
      const unixTimestamp = moment().subtract(3, 'weeks').unix();
      expect(pipe.transform(unixTimestamp)).toContain('weeks ago');
    });

    it('months ago', () => {
      const unixTimestamp = moment().subtract(5, 'months').unix();
      expect(pipe.transform(unixTimestamp)).toContain('months ago');
    });

    it('years ago', () => {
      const unixTimestamp = moment().subtract(5, 'years').unix();
      expect(pipe.transform(unixTimestamp)).toContain('years ago');
    });

    it('years with months ago', () => {
      const unixTimestamp = moment().subtract(5, 'years').subtract(5, 'months').unix();
      expect(pipe.transform(unixTimestamp)).toContain('years,');
      expect(pipe.transform(unixTimestamp)).toContain('months ago');
    });
  });
});
