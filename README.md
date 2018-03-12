# Cartblanched

> Order groceries based on the ingredient lists of your favorite recipes. Cartblanched will automatically populate an online shopping cart with the ingredients you need. Don't want to order online? Get your ingredient lists texted to your phone.

## Developer Team

  - [Evaline Bai](https://github.com/evalineBai)
  - [Norbie Magno](https://github.com/Magnoes)
  - [Mike Butak](https://github.com/mikebutak)

## Getting Started

1. Register for the following API keys to enable full access to features:
  - [Spoonacular API key](https://rapidapi.com/user/spoonacular/package/Recipe%20-%20Food%20-%20Nutrition/pricing)
  - [Twilio account](https://www.twilio.com/docs/api/rest/account)
  - [Twilio API key](https://www.twilio.com/docs/api/rest/keys)
  - [Walmart account](https://developer.walmartlabs.com/member)
  - [Walmart API key](https://developer.walmartlabs.com/apps/mykeys)
  
2. In your root directory, create a .env file with the following:
```
TWILIO_ACCOUNT_SID=(insert key here)
TWILIO_AUTH_TOKEN=(insert key here)
X_MASHAPE_KEY=(insert key here)
MONGO=mongodb://localhost/cartblanched
WALMART_KEY=(insert key here)
```
3. Run the following start scripts in your root dir:
  - npm install
  - npm run react-dev
  - npm run server-dev
  - sudo mongod
  - optional: run an instance of mongo
  
4. Navigate to localhost:3000 in your browser

5. Run test script with 'npm run test' from the root directory to test your code

## Dependencies
```
    "axios": "^0.18.0",
    "babel": "^6.23.0",
    "bcrypt": "^1.0.3",
    "bluebird": "^3.5.1",
    "body-parser": "^1.18.2",
    "cookie-parser": "^1.4.3",
    "date-season": "0.0.2",
    "dotenv": "^5.0.0",
    "express": "^4.16.2",
    "express-session": "^1.15.6",
    "jquery": "^3.3.1",
    "lodash": "^4.17.5",
    "mongoose": "^5.0.6",
    "path": "^0.12.7",
    "react": "^16.2.0",
    "react-cookie": "^1.0.5",
    "react-dom": "^16.2.0",
    "react-popup": "^0.9.2",
    "react-router": "^4.2.0",
    "react-router-dom": "^4.2.2",
    "react-sortable-hoc": "^0.6.8",
    "request": "^2.83.0",
    "request-promise": "^4.2.2",
    "semantic-ui-css": "^2.3.0",
    "semantic-ui-react": "^0.78.3",
    "twilio": "^3.11.3"
```

Dev Dependencies

```
  "babel-core": "^6.26.0",
  "babel-loader": "^7.1.2",
  "babel-plugin-transform-object-rest-spread": "^6.26.0",
  "babel-preset-env": "^1.6.1",
  "babel-preset-es2015": "^6.24.1",
  "babel-preset-flow": "^6.23.0",
  "babel-preset-react": "^6.24.1",
  "chai": "^4.1.2",
  "css-loader": "^0.28.10",
  "file-loader": "^1.1.11",
  "mocha": "^5.0.4",
  "style-loader": "^0.20.2",
  "supertest": "^3.0.0",
  "url-loader": "^1.0.1",
  "webpack": "^3.11.0",
  "webpack-cli": "^2.0.10",
  "webpack-dev-server": "^3.1.0"
  
```
