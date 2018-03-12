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

let saveRecipe = (username, recipe) => {
  return User.findOneAndUpdate(
    { 'username': username },
    { $addToSet: {'favorites': recipe} },
    { new: true }
  );
};

let retrieveFavorites = (username) => {
  return new Promise((resolve, reject) => {
    User.find({ 'username': username })
    .select('favorites')
    .sort({ likes: -1 })
    .exec((err, favorites) => {
      if (err) {
        reject(err);
      } else {
        resolve(favorites);
      }
    });
  });
};

module.exports = {
  saveUser: saveUser,
  saveRecipe: saveRecipe,
  retrieveFavorites: retrieveFavorites,
  User: User
};
