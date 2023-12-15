import { Test, TestingModule } from '@nestjs/testing';
import { ZakerController } from './zaker.controller';

describe('ZakerController', () => {
  let controller: ZakerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ZakerController],
    }).compile();

    controller = module.get<ZakerController>(ZakerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
