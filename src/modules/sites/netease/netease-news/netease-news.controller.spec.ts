import { Test, TestingModule } from '@nestjs/testing';
import { NeteaseNewsController } from './netease-news.controller';

describe('NeteaseNewsController', () => {
  let controller: NeteaseNewsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NeteaseNewsController],
    }).compile();

    controller = module.get<NeteaseNewsController>(NeteaseNewsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
