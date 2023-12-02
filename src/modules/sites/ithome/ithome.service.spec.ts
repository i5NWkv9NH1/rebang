import { Test, TestingModule } from '@nestjs/testing';
import { IthomeService } from './ithome.service';

describe('IthomeService', () => {
  let service: IthomeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [IthomeService],
    }).compile();

    service = module.get<IthomeService>(IthomeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
