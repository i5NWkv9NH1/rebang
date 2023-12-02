import { Test, TestingModule } from '@nestjs/testing';
import { ToutiaoController } from './toutiao.controller';

describe('ToutiaoController', () => {
  let controller: ToutiaoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ToutiaoController],
    }).compile();

    controller = module.get<ToutiaoController>(ToutiaoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
