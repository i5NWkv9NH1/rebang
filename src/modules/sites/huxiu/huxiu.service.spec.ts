import { Test, TestingModule } from '@nestjs/testing';
import { HuxiuService } from './huxiu.service';

describe('HuxiuService', () => {
  let service: HuxiuService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HuxiuService],
    }).compile();

    service = module.get<HuxiuService>(HuxiuService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
