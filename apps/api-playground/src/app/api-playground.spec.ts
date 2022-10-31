import { PORT, runDefaultNodeApp } from './api-playground';
describe('apiPlayground', () => {
  it('should work', () => {
    expect(runDefaultNodeApp()).toEqual(`app is running ${PORT}`);
  });
});
