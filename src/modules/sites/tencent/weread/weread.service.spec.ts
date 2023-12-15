import { Test, TestingModule } from '@nestjs/testing';
import { WereadService } from './weread.service';

describe('WereadService', () => {
  let service: WereadService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WereadService],
    }).compile();

    service = module.get<WereadService>(WereadService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
