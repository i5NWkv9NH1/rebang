import { Test, TestingModule } from '@nestjs/testing';
import { GuangdongService } from './guangdong.service';

describe('GuangdongService', () => {
  let service: GuangdongService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GuangdongService],
    }).compile();

    service = module.get<GuangdongService>(GuangdongService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
