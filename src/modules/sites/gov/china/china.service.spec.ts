import { Test, TestingModule } from '@nestjs/testing';
import { ChinaService } from './china.service';

describe('ChinaService', () => {
  let service: ChinaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ChinaService],
    }).compile();

    service = module.get<ChinaService>(ChinaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
