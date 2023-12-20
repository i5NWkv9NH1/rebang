import { Test, TestingModule } from '@nestjs/testing'
import { PearVideoController } from './pearvideo.controller'

describe('PearvideoController', () => {
  let controller: PearVideoController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PearVideoController]
    }).compile()

    controller = module.get<PearVideoController>(PearVideoController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
