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

const User = mongoose.model('User', userSchema);

const saveUser = (userData) => {
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

const saveRecipe = (username, recipe) => {
  return User.findOneAndUpdate(
    { 'username': username },
    { $addToSet: {'favorites': recipe} },
    { new: true }
  );
};

const deleteRecipe = (username, recipe) => {
  return User.update(
    { 'username': username },
    { $pull: {'favorites': {id: recipe.id} }}
  );
}

const retrieveFavorites = (username) => {
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
  User: User,
  saveUser: saveUser,
  saveRecipe: saveRecipe,
  deleteRecipe: deleteRecipe,
  retrieveFavorites: retrieveFavorites,
};
