import { Test, TestingModule } from '@nestjs/testing';
import { HupuService } from './hupu.service';

describe('HupuService', () => {
  let service: HupuService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HupuService],
    }).compile();

    service = module.get<HupuService>(HupuService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
