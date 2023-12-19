import { Test, TestingModule } from '@nestjs/testing';
import { CcdiService } from './ccdi.service';

describe('CcdiService', () => {
  let service: CcdiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CcdiService],
    }).compile();

    service = module.get<CcdiService>(CcdiService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
