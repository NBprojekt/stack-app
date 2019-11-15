import { ShortenNumberPipe } from './shorten-number.pipe';

describe('ShortenNumberPipe', () => {
  let pipe: ShortenNumberPipe;

  beforeEach(() => {
    pipe = new ShortenNumberPipe();
  });

  it('Should create', () => {
    expect(pipe).toBeTruthy();
  });

  describe('Should format', () => {
    it('up to hundreds', () => {
      expect(pipe.transform(297)).toEqual('297');
    });

    it('thousands', () => {
      expect(pipe.transform(5297)).toEqual('5.2k');
    });
    it('ten thousands', () => {
      expect(pipe.transform(75297)).toEqual('75.2k');
    });
    it('hundred thousands', () => {
      expect(pipe.transform(175297)).toEqual('175k');
    });

    it('millions', () => {
      expect(pipe.transform(8175297)).toEqual('8.1m');
    });
    it('ten millions', () => {
      expect(pipe.transform(38175297)).toEqual('38.1m');
    });
    it('hundred millions', () => {
      expect(pipe.transform(438175297)).toEqual('438m');
    });
  });
});
