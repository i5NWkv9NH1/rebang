import { Test, TestingModule } from '@nestjs/testing'
import { ITHomeController } from './ithome.controller'

describe('IthomeController', () => {
  let controller: ITHomeController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ITHomeController]
    }).compile()

    controller = module.get<ITHomeController>(ITHomeController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
