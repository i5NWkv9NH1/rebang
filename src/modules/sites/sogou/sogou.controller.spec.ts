import { Test, TestingModule } from '@nestjs/testing';
import { SogouController } from './sogou.controller';

describe('SogouController', () => {
  let controller: SogouController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SogouController],
    }).compile();

    controller = module.get<SogouController>(SogouController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
