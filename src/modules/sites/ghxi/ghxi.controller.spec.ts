import { Test, TestingModule } from '@nestjs/testing';
import { GhxiController } from './ghxi.controller';

describe('GhxiController', () => {
  let controller: GhxiController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GhxiController],
    }).compile();

    controller = module.get<GhxiController>(GhxiController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
