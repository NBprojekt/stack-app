import { SnakeToHumanPipe } from './snake-to-human.pipe';

describe('SnakeToHumanPipe', () => {
  let pipe: SnakeToHumanPipe;

  beforeEach(() => {
    pipe = new SnakeToHumanPipe();
  });

  it('Should create', () => {
    expect(pipe).toBeTruthy();
  });

  describe('Should format', () => {
    it('lowercase snake', () => {
      expect(pipe.transform('test_value')).toBe('Test value');
    });
    it('uppercase snake', () => {
      expect(pipe.transform('Test_Value')).toBe('Test Value');
    });
  });
});
