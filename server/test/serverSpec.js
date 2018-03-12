const spoonacularHelpers = require('../../helpers/spoonacularHelpers.js');
const axios = require('axios');
const $ = require('jquery');
const request = require('request');
require('dotenv').config();

const runTests = function () {
  testSpoonacularGet();
  // testSignupBlankForm();
};

const testSpoonacularGet = function () {
  let sampleRecipeId = '32829';
  spoonacularHelpers.getIngredients(sampleRecipeId)
    .then((data) => {
      var output;
      if (!data || !data.title || data === undefined || data.title === undefined) {
        console.log(`❌  The Spoonacular API did not return a valid response.  Something could be wrong with the request made to Spoonacular, or Spoonacular is not responding as expected.`)
      }
      if (data.title === 'Creamy Green Beans') {
        output = `✅  Test Passed! (Expected spoonacularHelpers.getIngredients to return 'Creamy Green Beans')`;
      } else {
        output = `❌  Test Failed. (Expected spoonacularHelpers.getIngredients to return 'Creamy Green Beans'.  Instead it returned ${data.title}.)`;
      }
      console.log(output);
  })
  .catch((err) => {
    console.log(`❌  Test Failed. - ${err.response.data.message}`);
  })
}

// ATTEMPT 1 TO TEST /signup
// const testSignupBlankForm = function () {
//   let obj = {
//       email: '',
//       username: '',
//       password: ''
//     };
//   axios.post('http://127.0.0.1:3000/signup', obj)
//     .then(function(response) {
//       console.log(`❌  Test Failed. (Server should not accept a blank form submission from the signup page.)`);
//       console.log(response, '<-- the response to axios test of signup endpoint');
//     })
//     .catch(function(error) {
//     if (error.response) {
//       console.log('the server responded with a status code that falls out of the range of 2xx');
//       console.log(error.response.data);
//       console.log(error.response.status);
//       console.log(error.response.headers);
//     } else if (error.request) {
//       console.log('the request was made to the server but no reponse was received.');
//       console.log(error.request);
//     } else {
//       console.log('something happened in setting up the request that triggered an error');
//       console.log('Error', error.message);
//     }
//       let errData = JSON.parse(err.config.data);
//       console.log(errData, '<-- that is an err from axios test of signup endpoint');
//     })
// }

// ATTEMPT 2 TO TEST /signup
// const testSignupBlankForm = function () {
//     let obj = {
//       email: '',
//       username: '',
//       password: ''
//     };
//     // console.log(JSON.parse($), '<-- $');
//     $.ajax({
//       type: 'POST',
//       url: 'http://127.0.0.1:3000/signup',
//       data: obj,
//       success: (res, textStatus, jqXHR) => {
//           console.log(`❌  Test Failed.  (The application should not accept an empty form submission from the signup page.)`)
//       },
//       error: (err) => {
//         console.log(err, '<-- this is an error msg from testSignupBlankForm');
//       }
//     });
//   }

// ATTEMPT 3 TO TEST /signup
// const testSignupBlankForm = function () {
//   request.post('http://127.0.0.1:3000/signup', {form:{username: '', email: '', password: ''}})
//     .on('response', function (error, response, body) {
//     console.log('error:', error); // Print the error if one occurred
//     console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
//     console.log('body:', body); // Print the HTML for the Google homepage.
//   })
// }

runTests();
// req.body = { email: '1', username: '2', password: '3' }
