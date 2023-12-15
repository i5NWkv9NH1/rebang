import { Test, TestingModule } from '@nestjs/testing';
import { PearvideoController } from './pearvideo.controller';

describe('PearvideoController', () => {
  let controller: PearvideoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PearvideoController],
    }).compile();

    controller = module.get<PearvideoController>(PearvideoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
