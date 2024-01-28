import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { WeatherGovService } from './weathergov/weathergov.service'
import { OpenstreetmapService } from './openstreetmap/openstreetmap.service'
import { AppService } from './app.service'

@Module({
  controllers: [AppController],
  providers: [AppService, WeatherGovService, OpenstreetmapService],
})
export class AppModule {}
