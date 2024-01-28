import { Injectable } from '@nestjs/common'
import axios, { AxiosInstance, AxiosResponse } from 'axios'
import { GeoCoordinates } from '../common/types'

interface ICoordinateResponseData {
  // place_id: number;
  // licence: 'Data © OpenStreetMap contributors, ODbL 1.0. http://osm.org/copyright';
  // osm_type: 'relation';
  // osm_id: 175905;
  lat: string
  lon: string
  // class: 'boundary';
  // type: 'administrative';
  // place_rank: 10;
  // importance: 0.8175766114518461;
  // addresstype: 'city';
  // name: 'City of New York';
  // display_name: 'City of New York, New York, United States';
  // boundingbox: ['40.4765780', '40.9176300', '-74.2588430', '-73.7002330']
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
