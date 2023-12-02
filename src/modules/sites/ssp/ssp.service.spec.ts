import { Test, TestingModule } from '@nestjs/testing';
import { SspService } from './ssp.service';

describe('SspService', () => {
  let service: SspService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SspService],
    }).compile();

    service = module.get<SspService>(SspService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
