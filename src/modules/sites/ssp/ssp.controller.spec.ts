import { Test, TestingModule } from '@nestjs/testing';
import { SspController } from './ssp.controller';

describe('SspController', () => {
  let controller: SspController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SspController],
    }).compile();

    controller = module.get<SspController>(SspController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
