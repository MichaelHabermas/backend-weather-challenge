import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { WeatherForecastResponse } from './common/types'
import { IPeriod, WeatherGovService } from './weathergov/weathergov.service'
import { OpenstreetmapService } from './openstreetmap/openstreetmap.service'

export type WeatherResponse = WeatherForecastResponse | { status: HttpStatus }

@Injectable()
export class AppService {
  constructor(
    private readonly weatherGovService: WeatherGovService,
    private readonly openStreetMapService: OpenstreetmapService,
  ) {}

  async getWeather(location: string | undefined): Promise<WeatherResponse> {
    if (!location) {
      throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST)
    }

    const { latitude, longitude } =
      await this.openStreetMapService.getCoordinates(location)

    const periods: IPeriod[] = await this.weatherGovService.getForecast(
      latitude,
      longitude,
    )

    return {
      periods: periods.map((period) => ({
        name: location,
        temperature: period.temperature.toString(),
        windSpeed: period.windSpeed,
        windDirection: period.windDirection,
      })),
    }
  }
}
