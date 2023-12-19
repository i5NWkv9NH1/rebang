import { Test, TestingModule } from '@nestjs/testing';
import { PiyaoService } from './piyao.service';

describe('PiyaoService', () => {
  let service: PiyaoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PiyaoService],
    }).compile();

    service = module.get<PiyaoService>(PiyaoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
