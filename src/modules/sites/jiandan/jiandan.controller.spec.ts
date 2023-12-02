import { Test, TestingModule } from '@nestjs/testing';
import { JiandanController } from './jiandan.controller';

describe('JiandanController', () => {
  let controller: JiandanController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [JiandanController],
    }).compile();

    controller = module.get<JiandanController>(JiandanController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
