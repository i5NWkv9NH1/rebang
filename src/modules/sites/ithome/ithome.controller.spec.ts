import { Test, TestingModule } from '@nestjs/testing';
import { IthomeController } from './ithome.controller';

describe('IthomeController', () => {
  let controller: IthomeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [IthomeController],
    }).compile();

    controller = module.get<IthomeController>(IthomeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
