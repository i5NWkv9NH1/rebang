import { Test, TestingModule } from '@nestjs/testing';
import { HupuController } from './hupu.controller';

describe('HupuController', () => {
  let controller: HupuController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HupuController],
    }).compile();

    controller = module.get<HupuController>(HupuController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
