const mongoose = require('mongoose');
const Promise = require("bluebird");

mongoose.connect(process.env.MONGO);

const Schema = mongoose.Schema;
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const userSchema = mongoose.Schema({
  username: String,
  password: String,
  email: String,
  favorites: [Schema.Types.Mixed]
});

let userFavoriteSchema = mongoose.Schema({
  username: String,
  id: Number,
  title: String,
  image: String,
  dateCreated: {
    type: Date,
    default: Date.now
  },
  likes: Number
});

let UserFavorite = mongoose.model('UserFavorite', userFavoriteSchema);


//Returning list of a user's favorites, sorted descending by popularity('likes')
let retrieve = (username) => {
  return new Promise(function(resolve, reject) {
    var query = UserFavorite.find({ 'username' : username });
    query.select({});
    query.limit(10);
    query.sort({ likes: -1 });
    query.exec(function(err, favorites) {
      if (err) {
        reject(err);
      } else {
        resolve(favorites);
      }
    });
  });
};

//Saving only relevant information from recipe object passed from front-end (see schema)
//Auto-generates a "now date"
let save = (documentObj) => {
  // using this code block to check if recipe is already duplicated in database
  // for user (we could have used _id to prevent duplicates, but because a user can have multiple recipes and a recipe can have multiple users, we saw no easy property of the schema to set as the _id... refer to Mongoose docs if unsure about why setting a _id property prevents duplicates)
  var duplicate = false;
  //return the output of the below function, which will be a promise
  return retrieve(documentObj.username).then(data => {
    for (var i = 0; i < data.length; i++) {
      if (data[i].title === documentObj.title) {
        duplicate = true;
        break;
      }
    }
  }).then(data => {
    //if this is not a duplicate recipe, save to database
    if (!duplicate) {
      return new Promise(function(resolve, reject) {
        let document = new UserFavorite({
          username: documentObj.username,
          id: documentObj.id,
          title: documentObj.title,
          image: documentObj.image,
          likes: documentObj.likes,
          extendedIngredients: documentObj.extendedIngredients
        });
        document.save(function(err, favorite) {
          if (err) reject(err);
          resolve(favorite);
        });
      });
    //else return (empty?) promise
    } else {
      return new Promise(function(resolve, reject) {
        resolve("Duplicate entry");
      });
    }
  });
};

module.exports = {
  save : save,
  retrieve : retrieve
};
