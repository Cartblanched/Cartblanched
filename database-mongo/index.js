const mongoose = require('mongoose');
const Promise = require("bluebird");
mongoose.connect(process.env.MONGO);

const Schema = mongoose.Schema;
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const userSchema = mongoose.Schema({
  username: {type: String, unique: true},
  password: String,
  email: String,
  favorites: [Schema.Types.Mixed]
});

let User = mongoose.model('User', userSchema);

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


let saveUser = (userData) => {
  return new Promise((resolve, reject) => {
    User.find({'username': userData.username})
      .exec((err, result) => {
        if (err) {
          console.log(err);
        } else {
          let user = new User({
            username: userData.username,
            password: userData.password,
            email: userData.email
          });
          user.save((err, newUser) => {
            if (err) reject(err);
            resolve(newUser);
          });
        }
    });
  });
};

let saveRecipe = (documentObj) => {
  var duplicate = false;
  return retrieve(documentObj.username).then(data => {
    for (var i = 0; i < data.length; i++) {
      if (data[i].title === documentObj.title) {
        duplicate = true;
        break;
      }
    }
  }).then(data => {
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
    } else {
      return new Promise(function(resolve, reject) {
        resolve("Duplicate entry");
      });
    }
  });
};

module.exports = {
  saveRecipe: saveRecipe,
  saveUser: saveUser,
  retrieve: retrieve,
  User: User
};
