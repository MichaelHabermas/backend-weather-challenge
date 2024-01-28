import { Test, TestingModule } from '@nestjs/testing'
import { WeatherGovService } from './weathergov.service'

describe('WeatherGovService', () => {
  let service: WeatherGovService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WeatherGovService],
    }).compile()

    service = module.get<WeatherGovService>(WeatherGovService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
