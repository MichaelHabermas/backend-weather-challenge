import * as request from 'supertest'
import { Test } from '@nestjs/testing'
import { AppModule } from '../src/app.module'
import { INestApplication } from '@nestjs/common'

describe('AppController (e2e)', () => {
  let app: INestApplication
  let httpServer: any

  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    app = moduleFixture.createNestApplication()
    await app.init()
    httpServer = app.getHttpServer()
  })

  describe('/weather (GET)', () => {
    it('with no query', async () => {
      const response = await request(httpServer).get('/weather')

      expect(response.statusCode).toEqual(400)
    })

    it('with location="new york"', async () => {
      const response = await request(httpServer)
        .get('/weather')
        .query({ location: 'new york' })

      expect(response.statusCode).toEqual(200)

      expect(response.body.periods).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            name: expect.any(String),
            temperature: expect.any(String),
            windSpeed: expect.any(String),
            windDirection: expect.any(String),
          }),
        ]),
      )
    })
  })

  afterAll(async () => {
    await app.close()
  })
})
