import { Test, TestingModule } from '@nestjs/testing';
import { ShadiaonewsService } from './shadiaonews.service';

describe('ShadiaonewsService', () => {
  let service: ShadiaonewsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ShadiaonewsService],
    }).compile();

    service = module.get<ShadiaonewsService>(ShadiaonewsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
