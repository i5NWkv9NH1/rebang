import { Test, TestingModule } from '@nestjs/testing';
import { ZhihuDailyService } from './zhihu-daily.service';

describe('ZhihuDailyService', () => {
  let service: ZhihuDailyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ZhihuDailyService],
    }).compile();

    service = module.get<ZhihuDailyService>(ZhihuDailyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
