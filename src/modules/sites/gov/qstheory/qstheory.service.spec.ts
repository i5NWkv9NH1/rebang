import { Test, TestingModule } from '@nestjs/testing';
import { QstheoryService } from './qstheory.service';

describe('QstheoryService', () => {
  let service: QstheoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [QstheoryService],
    }).compile();

    service = module.get<QstheoryService>(QstheoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
