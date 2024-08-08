# Pokedex

Pokedex is a home task project for JitterBit hiring process.
It contains a server-side
REST API built using [NestJS](https://nestjs.com) and a client-side single-page
application built in [Angular](https://angular.dev).
Here are the things I've done:

- Built NestJS backend with REST API endpoints
- Built Angular frontend components
- Implemented seamless UI with Angular-Material
- Implemented unit testing with Jest

## Prerequisites

- [Node.js v20](https://nodejs.org/en)

## Setup

- Install dependencies:
  ```shell
  cd /path/to/cloned/pokedex/
  cd ../api/
  npm install
  cd ../app/
  npm install
  ```

## Run

In two separate shells, start the API and app:

1. Run the NestJS backend
   ```shell
   cd api/
   npm start
   ```
2. Run the Angular frontend
   ```shell
   cd app/
   npm start
   ```
3. Run testing (frontend)
   ```shell
   cd app/
   npm test
   ```
