import { Test, TestingModule } from '@nestjs/testing';
import { AgefansController } from './agefans.controller';

describe('AgefansController', () => {
  let controller: AgefansController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AgefansController],
    }).compile();

    controller = module.get<AgefansController>(AgefansController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
