const spoonacularHelpers = require('../../helpers/spoonacularHelpers.js');
const axios = require('axios');
require('dotenv').config();


const runTests = function () {
  testSpoonacularGet();
  testSignupEndpoint();
};

const testSpoonacularGet = function () {
  let sampleRecipeId = '32829';
  spoonacularHelpers.getIngredients(sampleRecipeId)
    .then((data) => {
      var output;
      if (!data || !data.title || data === undefined || data.title === undefined) {
        console.log(`🤔  The Spoonacular API did not return a valid response.  Something could be wrong with the request made to Spoonacular.`)
      }
      if (data.title === 'Creamy Green Beans') {
        output = `😀  Test Passed! (Expected spoonacularHelpers.getIngredients to return 'Creamy Green Beans' if given recipe id 32829)`;
      } else {
        output = `🤔  Test Failed. (Expected spoonacularHelpers.getIngredients to return 'Creamy Green Beans' if given recipe id 32829.  Instead it returned ${data.title}.)`;
      }
      console.log(output);
  })
}

const testSignupEndpoint = function () {
  let badSignup = {
      email: '',
      username: '',
      password: ''
    };

  axios.post('/signup', badSignup)
    .then(function(response) {
      console.log(response, '<-- the response to axios test of signup endpoint');
    })
    .catch(function(err) {
      let errData = JSON.parse(err.config.data);
      console.log(errData, '<-- that is an err from axios test of signup endpoint');
    })

// req.body = { email: '1', username: '2', password: '3' }
}





runTests();

module.exports.runTests = runTests;