import { Test, TestingModule } from '@nestjs/testing';
import { DswxyjyService } from './dswxyjy.service';

describe('DswxyjyService', () => {
  let service: DswxyjyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DswxyjyService],
    }).compile();

    service = module.get<DswxyjyService>(DswxyjyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
