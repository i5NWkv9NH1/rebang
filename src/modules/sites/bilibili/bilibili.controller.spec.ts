import { Test, TestingModule } from '@nestjs/testing';
import { BilibiliController } from './bilibili.controller';

describe('BilibiliController', () => {
  let controller: BilibiliController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BilibiliController],
    }).compile();

    controller = module.get<BilibiliController>(BilibiliController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
