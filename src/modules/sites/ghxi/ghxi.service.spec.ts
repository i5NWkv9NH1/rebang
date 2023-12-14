import { Test, TestingModule } from '@nestjs/testing';
import { GhxiService } from './ghxi.service';

describe('GhxiService', () => {
  let service: GhxiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GhxiService],
    }).compile();

    service = module.get<GhxiService>(GhxiService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
