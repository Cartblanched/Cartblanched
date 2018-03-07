# Cartblanched

> An web application that allows you to shop your favorite recipes, get grocery deliveries, and text ingredient lists to others.

## Developer Team

  - [Evaline Bai](https://github.com/evalineBai)
  - [Norbie Magno](https://github.com/Magnoes)
  - [Mike Butak](https://github.com/mikebutak)

## Table of Contents

## Getting Started

- App deployed on Heroku at https://foodmatrix.herokuapp.com/

- Spoonacular API
  -Register for a [Spoonacular API key](https://rapidapi.com/user/spoonacular/package/Recipe%20-%20Food%20-%20Nutrition/pricing)
  - Add API key to X_MASHAPE_KEY variable in .env file

- Twilio API
  - Register for a [Twilio account](https://www.twilio.com/docs/api/rest/account) and [Twilio API key](https://www.twilio.com/docs/api/rest/keys)
  - Add Twilio SID and Auth Token to TWILIO_ACCOUNT_SID and TWILIO_AUTH_TOKEN variables and MONGO=mongodb://localhost/foodmatrix in your .env file

- Database Installation
  - [Install mongoDB](https://docs.mongodb.com/getting-started/shell/tutorial/install-mongodb-on-os-x/)

- Terminal Commands
  - Install dependencies:
  ```sh
  npm install
  ```
  - Start React:
  ```sh
  npm run react-dev
  ```
  - Start Server:
  ```sh
  npm run server-dev
  ```
  - Start Mongo Database: (may vary based on install location)
  ```sh
  mongod
  ```

- Run app in browser at localhost:3000
