import { Test, TestingModule } from '@nestjs/testing';
import { PengpaiController } from './pengpai.controller';

describe('PengpaiController', () => {
  let controller: PengpaiController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PengpaiController],
    }).compile();

    controller = module.get<PengpaiController>(PengpaiController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
