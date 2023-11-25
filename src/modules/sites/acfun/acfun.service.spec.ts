import { Test, TestingModule } from '@nestjs/testing'
import { AcFunService } from './acfun.service'

describe('AcfunService', () => {
  let service: AcFunService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AcFunService]
    }).compile()

    service = module.get<AcFunService>(AcFunService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
