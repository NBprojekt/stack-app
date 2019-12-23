import { SnakeToHumanPipe } from './snake-to-human.pipe';

describe('SnakeToHumanPipe', () => {
  it('create an instance', () => {
    const pipe = new SnakeToHumanPipe();
    expect(pipe).toBeTruthy();
  });
});
