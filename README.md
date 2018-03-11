# Cartblanched

> Order groceries to your home based on the ingredient lists of your favorite recipes. Cartblanched will automatically populate an online shopping cart with the ingredients you need. Don't want to order online? Get your ingredient lists sent to you via or friends and family while at the grocery store.

## Developer Team

  - [Evaline Bai](https://github.com/evalineBai)
  - [Norbie Magno](https://github.com/Magnoes)
  - [Mike Butak](https://github.com/mikebutak)

## Getting Started

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
