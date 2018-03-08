require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const recipe = require('../database-mongo/RecipeIDData.js');
const recipeList = require('../database-mongo/RecipeListData.js');
const twilioHelpers = require('../helpers/twilioHelpers.js');
const spoonacularHelpers = require('../helpers/spoonacularHelpers.js');
const db = require('../database-mongo/index.js');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/../client/dist'));

//Save endpoint for database that will save a favorited recipe
//sample body object
//{ username: 'greg7',
//   id: '1242414',
//   title: 'food',
//   image: 'awesomepic.jpg',
//   likes: '1351563'
// }
app.post('/db/save', (req, res) => {
  var documentObj = req.body;
  db.save(documentObj)
    .then(response => res.send('saved to db'));
});

//Fetch endpoint for database that will fetch all recipes for a user
//sample request: localhost:3000/db/fetch?username=username
app.get('/db/fetch', (req, res) => {
  var username = req.query.username;
  db.retrieve(username)
    .then(data => res.send(data));
});

//Recipes endpoint to spoonacular API call based on ingredients
//sample request: localhost:3000/recipes?ingredients=apples,flour,butter
app.get('/recipes', (req, res) => {
  var ingredients = req.query.ingredients;
  if(ingredients) {
    spoonacularHelpers.getRecipesByIngredients(ingredients)
      .then(data => res.send(data.data));
  } else {
    res.status(400).send({
       message: 'Pick Some Ingredients Please'
    });
  }
});

//Recipe endpoint that routes to spoonacular API called based on recipe ID
//sample request: localhost:3000/recipe/615374
app.get('/recipe/:id', (req, res) => {
  var recipeID = req.params.id;
  spoonacularHelpers.getIngredients(recipeID)
    .then(data => res.send(data));
});

//Send text endpoint that will send a text to a phonenumber
//sample request: localhost:3000/sendText  body{number: '13017413473'}
app.post('/sendText', bodyParser.json(), (req, res) => {
  var phoneNumber = req.body.number;
  var ingredients = req.body.ingredients;
  twilioHelpers.sendMessage(phoneNumber, ingredients)
    .then(res.send('message sent'));
});



app.listen(process.env.PORT || 3000, () => console.log('Cartblanched listening on port 3000!'))

module.exports = app;