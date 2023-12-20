import { Test, TestingModule } from '@nestjs/testing'
import { PearVideoService } from './pearvideo.service'

describe('PearvideoService', () => {
  let service: PearVideoService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PearVideoService]
    }).compile()

    service = module.get<PearVideoService>(PearVideoService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
