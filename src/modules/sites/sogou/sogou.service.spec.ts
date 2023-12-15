import { Test, TestingModule } from '@nestjs/testing';
import { SogouService } from './sogou.service';

describe('SogouService', () => {
  let service: SogouService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SogouService],
    }).compile();

    service = module.get<SogouService>(SogouService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
