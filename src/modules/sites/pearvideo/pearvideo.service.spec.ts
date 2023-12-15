import { Test, TestingModule } from '@nestjs/testing';
import { PearvideoService } from './pearvideo.service';

describe('PearvideoService', () => {
  let service: PearvideoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PearvideoService],
    }).compile();

    service = module.get<PearvideoService>(PearvideoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
