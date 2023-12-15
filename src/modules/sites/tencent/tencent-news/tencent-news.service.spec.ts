import { Test, TestingModule } from '@nestjs/testing';
import { TencentNewsService } from './tencent-news.service';

describe('TencentNewsService', () => {
  let service: TencentNewsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TencentNewsService],
    }).compile();

    service = module.get<TencentNewsService>(TencentNewsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
