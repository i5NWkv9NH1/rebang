import { Test, TestingModule } from '@nestjs/testing';
import { JiandanService } from './jiandan.service';

describe('JiandanService', () => {
  let service: JiandanService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [JiandanService],
    }).compile();

    service = module.get<JiandanService>(JiandanService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
