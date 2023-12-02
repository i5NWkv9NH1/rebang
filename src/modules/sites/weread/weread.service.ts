import { Injectable, Logger } from '@nestjs/common'
import { genUserAgent } from 'src/helpers'
import { FetchService } from 'src/shared/fetch.service'

//TODO: update
@Injectable()
export class WereadService {
  private readonly logger = new Logger(WereadService.name)
  private readonly headers = {
    'User-Agent': genUserAgent('desktop')
  }
  private readonly defaultParams = {
    maxIndex: 20,
    rank: 1
  }

  constructor(private readonly fetchService: FetchService) {}

  public async all() {}
  public async rising() {}
  public async newBook() {}
  public async novel() {}
  public async newRating() {}
  public async newRatingPotential() {}
  public async hotSeach() {}
}
