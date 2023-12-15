import { Test, TestingModule } from '@nestjs/testing';
import { ZakerService } from './zaker.service';

describe('ZakerService', () => {
  let service: ZakerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ZakerService],
    }).compile();

    service = module.get<ZakerService>(ZakerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
