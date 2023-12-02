import { Test, TestingModule } from '@nestjs/testing'
import { _360Controller } from './_360.controller'

describe('_360Controller', () => {
  let controller: _360Controller

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [_360Controller]
    }).compile()

    controller = module.get<_360Controller>(_360Controller)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
