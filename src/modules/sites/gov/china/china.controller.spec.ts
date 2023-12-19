import { Test, TestingModule } from '@nestjs/testing';
import { ChinaController } from './china.controller';

describe('ChinaController', () => {
  let controller: ChinaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ChinaController],
    }).compile();

    controller = module.get<ChinaController>(ChinaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
