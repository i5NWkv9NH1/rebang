import { Test, TestingModule } from '@nestjs/testing';
import { CeaService } from './cea.service';

describe('CeaService', () => {
  let service: CeaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CeaService],
    }).compile();

    service = module.get<CeaService>(CeaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
