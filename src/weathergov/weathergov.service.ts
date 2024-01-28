import { Injectable } from '@nestjs/common'
import axios, { AxiosInstance, AxiosResponse } from 'axios'

interface IGridData {
  gridId: string
  gridX: number
  gridY: number
}

interface IWG {
  properties: IGridData
}

export interface IPeriod {
  temperature: number
  temperatureUnit: string
  windSpeed: string
  windDirection: string
}

interface IGetForecastResponse {
  properties: {
    periods: IPeriod[]
  }
}

@Injectable()
export class WeatherGovService {
  private httpClient: AxiosInstance

  constructor() {
    this.httpClient = axios.create({
      baseURL: 'https://api.weather.gov/',
    })
  }

  async getForecast(latitude: string, longitude: string): Promise<IPeriod[]> {
    const { gridId, gridX, gridY } = await this.getPoint(latitude, longitude)

    const response: AxiosResponse<IGetForecastResponse> =
      await this.httpClient.get(
        `/gridpoints/${gridId}/${gridX},${gridY}/forecast`,
      )

    if (!response.data) {
      return undefined
    }

    return response.data.properties.periods
  }

  async getPoint(latitude: string, longitude: string): Promise<IGridData> {
    const response: AxiosResponse<IWG> = await this.httpClient.get(
      `/points/${latitude},${longitude}`,
    )

    if (!response.data) {
      return undefined
    }

    const { gridId, gridX, gridY } = response.data.properties

    return { gridId, gridX, gridY }
  }
}
