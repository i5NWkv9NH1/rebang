import { Test, TestingModule } from '@nestjs/testing';
import { HuxiuController } from './huxiu.controller';

describe('HuxiuController', () => {
  let controller: HuxiuController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HuxiuController],
    }).compile();

    controller = module.get<HuxiuController>(HuxiuController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
