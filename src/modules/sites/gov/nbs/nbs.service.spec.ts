import { Test, TestingModule } from '@nestjs/testing';
import { NbsService } from './nbs.service';

describe('NbsService', () => {
  let service: NbsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NbsService],
    }).compile();

    service = module.get<NbsService>(NbsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
