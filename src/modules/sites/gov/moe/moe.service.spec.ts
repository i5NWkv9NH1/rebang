import { Test, TestingModule } from '@nestjs/testing';
import { MoeService } from './moe.service';

describe('MoeService', () => {
  let service: MoeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MoeService],
    }).compile();

    service = module.get<MoeService>(MoeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
