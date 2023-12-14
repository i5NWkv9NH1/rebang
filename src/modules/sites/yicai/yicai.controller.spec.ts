import { Test, TestingModule } from '@nestjs/testing';
import { YicaiController } from './yicai.controller';

describe('YicaiController', () => {
  let controller: YicaiController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [YicaiController],
    }).compile();

    controller = module.get<YicaiController>(YicaiController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
