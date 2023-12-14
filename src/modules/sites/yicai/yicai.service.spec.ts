import { Test, TestingModule } from '@nestjs/testing';
import { YicaiService } from './yicai.service';

describe('YicaiService', () => {
  let service: YicaiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [YicaiService],
    }).compile();

    service = module.get<YicaiService>(YicaiService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
