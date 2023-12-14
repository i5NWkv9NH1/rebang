import { Test, TestingModule } from '@nestjs/testing';
import { AgefansService } from './agefans.service';

describe('AgefansService', () => {
  let service: AgefansService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AgefansService],
    }).compile();

    service = module.get<AgefansService>(AgefansService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
