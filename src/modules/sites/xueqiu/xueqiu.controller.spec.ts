import { Test, TestingModule } from '@nestjs/testing';
import { XueqiuController } from './xueqiu.controller';

describe('XueqiuController', () => {
  let controller: XueqiuController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [XueqiuController],
    }).compile();

    controller = module.get<XueqiuController>(XueqiuController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
