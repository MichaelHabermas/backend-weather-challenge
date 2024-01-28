import { Controller, Get, Query } from '@nestjs/common'
import { AppService, WeatherResponse } from './app.service'

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('weather')
  async getWeather(
    @Query('location') location: string | undefined,
  ): Promise<WeatherResponse> {
    return this.appService.getWeather(location)
  }
}
