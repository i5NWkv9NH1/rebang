import { Test, TestingModule } from '@nestjs/testing';
import { BilibiliService } from './bilibili.service';

describe('BilibiliService', () => {
  let service: BilibiliService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BilibiliService],
    }).compile();

    service = module.get<BilibiliService>(BilibiliService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
