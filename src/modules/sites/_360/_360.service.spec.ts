import { Test, TestingModule } from '@nestjs/testing'
import { _360Service } from './_360.service'

describe('360Service', () => {
  let service: _360Service

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [_360Service]
    }).compile()

    service = module.get<_360Service>(_360Service)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
