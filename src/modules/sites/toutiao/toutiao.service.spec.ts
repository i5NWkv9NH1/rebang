import { Test, TestingModule } from '@nestjs/testing';
import { ToutiaoService } from './toutiao.service';

describe('ToutiaoService', () => {
  let service: ToutiaoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ToutiaoService],
    }).compile();

    service = module.get<ToutiaoService>(ToutiaoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
