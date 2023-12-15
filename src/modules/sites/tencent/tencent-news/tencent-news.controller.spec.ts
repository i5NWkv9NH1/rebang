import { Test, TestingModule } from '@nestjs/testing';
import { TencentNewsController } from './tencent-news.controller';

describe('TencentNewsController', () => {
  let controller: TencentNewsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TencentNewsController],
    }).compile();

    controller = module.get<TencentNewsController>(TencentNewsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
