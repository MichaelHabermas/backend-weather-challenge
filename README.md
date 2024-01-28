 # Overview

This is a simple NodeJS backend service (only a RESTful API) which will return the forecast of a specified location
using publicly available APIs. The goal is that a caller can provide a location (city, zipcode, full address) and will
receive the forecast for the next 5 periods that location.

Frameworks included in the project:

* [NestJS](https://nestjs.com/) - Backend framework, provides IOC/DI for lifecycle management
* [Axios](https://axios-http.com/docs/intro) - Promise based HTTP client
* [Jest](https://jestjs.io/) - Testing framework

___

## API Structure

There is only a single endpoint exposed by the service.

* `/weather?location=[string]`

Behind the scenes, this endpoint will make use of two services to convert the location into the final forecast.

* [Openstreetmap](https://nominatim.org/release-docs/develop/api/Search/)
    * `/search` - Returns a list of geocoded data in order of importance
* [Weather.gov](https://www.weather.gov/documentation/services-web-api#/default/zone_list)
    * `/points/{lat},{lon}` - Returns the point information (location + station information). We need the grid
      information.
    * `/gridpoints/{gridId}/{gridX),{gridY}/forecast` - Returns the forecast for the location
___
## Objective

* Implement both services in order to call the necessary APIs to retrieve required data
* Implement the controller to invoke the services to orchestrate the necessary API calls and return the final result
___
## Running the application & specs
### Running the tests via docker-compose (with containerization)
* To run the tests via `docker-compose`, simply run `docker-compose up` and the service will launch with the test suite running in `--watch` mode.
  * In this mode, the test suite will run in full once, and then listen for changes.
  * If changes are detected, the suite will only rerun the affected specs.

### Running the tests or service locally via npm (without containerization)
__Running the test suite__
* To run the test suite once, run `npm run test`
* To run the test suite in `--watch` mode, run `npm run test:watch`. 
  * In this mode, the test suite will run in full once, and then listen for changes. 
  * If changes are detected, the suite will only rerun the affected specs.
* To run the tests in debug mode, run `npm run test:debug`

__Running the service__
* To start the service, run `npm run start:dev` to have Node hot-reload file changes in realtime.
* To start the service in debug mode, run `npm run start:debug`

### Running the tests locally via Make (without containerization)
* To run the test suite once, run `make test.all`
* To run the test suite in `--watch` mode, run `make test.watch`.
  * In this mode, the test suite will run in full once, and then listen for changes. 
  * If changes are detected, the suite will only rerun the affected specs.
