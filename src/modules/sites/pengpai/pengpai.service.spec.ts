import { Test, TestingModule } from '@nestjs/testing';
import { PengpaiService } from './pengpai.service';

describe('PengpaiService', () => {
  let service: PengpaiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PengpaiService],
    }).compile();

    service = module.get<PengpaiService>(PengpaiService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
