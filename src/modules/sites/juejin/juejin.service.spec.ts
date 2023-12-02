import { Test, TestingModule } from '@nestjs/testing';
import { JuejinService } from './juejin.service';

describe('JuejinService', () => {
  let service: JuejinService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [JuejinService],
    }).compile();

    service = module.get<JuejinService>(JuejinService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
