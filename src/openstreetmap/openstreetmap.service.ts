import { Injectable } from '@nestjs/common'
import axios, { AxiosInstance, AxiosResponse } from 'axios'
import { GeoCoordinates } from '../common/types'

interface ICoordinateResponseData {
  lat: string
  lon: string
}

interface ICoordinateResponse {
  data: ICoordinateResponseData[]
}

@Injectable()
export class OpenstreetmapService {
  private httpClient: AxiosInstance

  constructor() {
    this.httpClient = axios.create({
      baseURL: 'https://nominatim.openstreetmap.org',
    })
  }

  async getCoordinates(location: string): Promise<GeoCoordinates> {
    const response: AxiosResponse<ICoordinateResponse> =
      await this.httpClient.get('/search', {
        params: { q: location, format: 'json' },
      })

    if (!response.data) {
      return undefined
    }

    return {
      latitude: response.data[0]?.lat,
      longitude: response.data[0]?.lon,
    }
  }
}
