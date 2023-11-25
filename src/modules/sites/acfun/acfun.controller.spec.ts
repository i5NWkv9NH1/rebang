import { Test, TestingModule } from '@nestjs/testing';
import { AcfunController } from './acfun.controller';

describe('AcfunController', () => {
  let controller: AcfunController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AcfunController],
    }).compile();

    controller = module.get<AcfunController>(AcfunController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
