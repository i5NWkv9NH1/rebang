import { Test, TestingModule } from '@nestjs/testing';
import { QqnewsController } from './qqnews.controller';

describe('QqnewsController', () => {
  let controller: QqnewsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [QqnewsController],
    }).compile();

    controller = module.get<QqnewsController>(QqnewsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
