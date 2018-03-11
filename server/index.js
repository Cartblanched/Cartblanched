require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');

const twilioHelpers = require('../helpers/twilioHelpers.js');
const spoonacularHelpers = require('../helpers/spoonacularHelpers.js');
const auth = require('../helpers/authHelpers.js');
const walmartHelpers = require('../helpers/walmartHelpers.js');
const db = require('../database-mongo/index.js');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/../client/dist'));
app.use(cookieParser());
app.use(session({
  secret: 'secrettoken',
  resave: false,
  saveUninitialized: true
}));

app.post('/signup', (req, res) => {
  bcrypt.hash(req.body.password, 10)
    .then((hash) => {
      let newUser =
      {
        username: req.body.username,
        password: hash,
        email: req.body.email,
      };
      db.saveUser(newUser)
        .then((newUser) => {
          res.status(200).send(`Successfully stored a new user: ${newUser}`);
          console.log(`Successfully stored a new user: ${newUser}`);
        })
    })
});

app.post('/login', (req, res) => {
  let username = req.body.username;
  let password = req.body.password;
  db.User.find({'username': username}).exec((err, user) => {
    if (!user) {
      res.redirect('/signup');
    } else {
      auth.comparePassword(password, username, (match) => {
        if (match) {
          auth.createSession(req, res, user);
          console.log(`Session has been created for ${user}`);
          res.status(200).send();
        } else {
          res.redirect('/login');
        }
      });
    }
  });
});

app.get('/logout', (req, res) => {
  req.session.destroy(() => {
    res.clearCookie('loggedIn');
    console.log('You are logged out');
    res.redirect('/login');
  });
});

app.post('/favorites', (req, res) => {
  let username = req.body.username;
  let recipe = {
    id: req.body.id,
    title: req.body.title,
    url: req.body.sourceUrl,
    image: req.body.image,
    likes: req.body.likes,
    extendedIngredients: req.body.extendedIngredients
  };
  db.saveRecipe(username, recipe)
    .then(response => res.send('Saved new recipe to favorites'));
});

app.get('/favorites', (req, res) => {
  let username = req.cookies.username;
  db.retrieveFavorites(username)
    .then(data => res.send(data));
});

app.post('/unfavorite', (req, res) => {
  let username = req.body.username;
  let recipe = {
    id: req.body.id,
    title: req.body.title,
    url: req.body.sourceUrl,
    image: req.body.image,
    likes: req.body.likes,
    extendedIngredients: req.body.extendedIngredients
  };
  db.deleteRecipe(username, recipe)
    .then(() => {
      console.log(`Successfully deleted favorite for ${username}`);
      res.status(200).send('Successfully deleted favorite from database');
    })
    .catch((err) => {
      console.log('Failed to delete favorite from database');
      console.log(err);
      res.status(500).send('Failed to delete favorite from database');
    });
});

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

app.get('/recipe/:id', (req, res) => {
  var recipeID = req.params.id;
  spoonacularHelpers.getIngredients(recipeID)
    .then((data) => {
      res.send(data);
    });
});

app.post('/sendText', bodyParser.json(), (req, res) => {
  var phoneNumber = req.body.number;
  var ingredients = req.body.ingredients;
  twilioHelpers.sendMessage(phoneNumber, ingredients)
    .then(res.send('message sent'));
});

app.get('/groceries', (req, res) => {
  const terms = req.query.ingredients.split(',');
  // split by '*' because sometimes the aisle will contain characters like ',' or '&', etc.
  const aisles = req.query.aisles.split('*');
  // Sometimes spoonacular aisles will have multiple aisles separated by ';'. Walmart API only
  // takes in one categoryId though, so we'll just keep the first aisle
  aisles.forEach(function(aisle, index) {
    aisles[index] = aisle.split(';')[0]
  });
  walmartHelpers.getProducts(terms, aisles, (results) => {
    res.status(200).send(results);
  })
});

app.get('/*', (req, res) => {
  res.redirect('/');
});

app.listen(process.env.PORT || 3000, () => console.log('Cartblanched listening on port 3000'));

module.exports = app;