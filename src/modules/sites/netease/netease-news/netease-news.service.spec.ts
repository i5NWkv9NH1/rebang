import { Test, TestingModule } from '@nestjs/testing';
import { NeteaseNewsService } from './netease-news.service';

describe('NeteaseNewsService', () => {
  let service: NeteaseNewsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NeteaseNewsService],
    }).compile();

    service = module.get<NeteaseNewsService>(NeteaseNewsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
