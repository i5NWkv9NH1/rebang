import { Test, TestingModule } from '@nestjs/testing';
import { WereadController } from './weread.controller';

describe('WereadController', () => {
  let controller: WereadController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WereadController],
    }).compile();

    controller = module.get<WereadController>(WereadController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
