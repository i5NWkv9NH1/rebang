import { Test, TestingModule } from '@nestjs/testing';
import { ZhihuDailyController } from './zhihu-daily.controller';

describe('ZhihuDailyController', () => {
  let controller: ZhihuDailyController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ZhihuDailyController],
    }).compile();

    controller = module.get<ZhihuDailyController>(ZhihuDailyController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
