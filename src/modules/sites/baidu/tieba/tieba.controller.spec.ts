import { Test, TestingModule } from '@nestjs/testing';
import { TiebaController } from './tieba.controller';

describe('TiebaController', () => {
  let controller: TiebaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TiebaController],
    }).compile();

    controller = module.get<TiebaController>(TiebaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
