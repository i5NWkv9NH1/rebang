import { Test, TestingModule } from '@nestjs/testing';
import { QqnewsService } from './qqnews.service';

describe('QqnewsService', () => {
  let service: QqnewsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [QqnewsService],
    }).compile();

    service = module.get<QqnewsService>(QqnewsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
