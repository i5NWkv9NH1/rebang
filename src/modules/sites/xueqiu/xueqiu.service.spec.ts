import { Test, TestingModule } from '@nestjs/testing';
import { XueqiuService } from './xueqiu.service';

describe('XueqiuService', () => {
  let service: XueqiuService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [XueqiuService],
    }).compile();

    service = module.get<XueqiuService>(XueqiuService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
