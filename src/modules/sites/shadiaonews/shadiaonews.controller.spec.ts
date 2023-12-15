import { Test, TestingModule } from '@nestjs/testing';
import { ShadiaonewsController } from './shadiaonews.controller';

describe('ShadiaonewsController', () => {
  let controller: ShadiaonewsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ShadiaonewsController],
    }).compile();

    controller = module.get<ShadiaonewsController>(ShadiaonewsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
