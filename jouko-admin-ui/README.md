# Jouko Admin UI

## Setup:
1. Refer to [Jouko API's README](https://github.com/Metatavu/jouko/blob/master/jouko-api/README.MD) first to setup the backend API.
2. ```npm install``` in the root directory of jouko-ui.
3. Change ```src/config.ts``` if your Java API endpoint is different from default.
4. Follow the instructions below if want to run the website in development or production.

## Useful commands:

To run the website in development mode:
```
npm run start
```
To run the website in production locally:
```
npm run build
```
```
npm install -g serve
```
```
serve -s build
```
To run tests:
```
npm run test
```