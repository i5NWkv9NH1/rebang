import { Test, TestingModule } from '@nestjs/testing';
import { TiebaService } from './tieba.service';

describe('TiebaService', () => {
  let service: TiebaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TiebaService],
    }).compile();

    service = module.get<TiebaService>(TiebaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
