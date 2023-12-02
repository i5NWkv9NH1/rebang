import { Test, TestingModule } from '@nestjs/testing';
import { 360Service } from './_360.service';

describe('360Service', () => {
  let service: 360Service;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [360Service],
    }).compile();

    service = module.get<360Service>(360Service);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
