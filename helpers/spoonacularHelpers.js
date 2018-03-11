const request = require('request-promise');
const _ = require('lodash');
const axios = require('axios');
var Promise = require("bluebird");

//Spoonacular API request that returns an array of 10 recipes based on ingredients query
var getRecipesByIngredients = function(ingredients) {
  ingredients = ingredients.split(',').join('%2C');
  return axios.get(`https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/findByIngredients?fillIngredients=false&ingredients=${ingredients}&limitLicense=false&number=10&ranking=1`, {
    headers: {
      'X-Mashape-Key': process.env.X_MASHAPE_KEY
      },
  });
};

//Spoonacular API request thta returns a specific recipe based on recipe ID
var getRecipeByRecipeID = function(recipeID) {
  return axios.get(`https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/${recipeID}/information?includeNutrition=false`, {
    headers: {
      'X-Mashape-Key': process.env.X_MASHAPE_KEY
      // 'X-Mashape-Key': 'te7EA65CUemshjbpnZ5GFI4QtVJGp1EPluVjsnnHVmWCYTxArS'
    }
  });
};

//Parse spoonacular API recipe response to pull out important data
var parseRecipe = function(recipe) {
  return _.map(recipe.extendedIngredients, function(ingredient) {
    return `${ingredient.name} ${ingredient.amount} ${ingredient.unit}`;
  });
};

//Returns promise with ingredients for a specific recipe ID
var getIngredients = function(recipeID) {
  return getRecipeByRecipeID(recipeID)
    .then(response => response.data);
};

module.exports.getRecipesByIngredients = getRecipesByIngredients;
module.exports.getIngredients = getIngredients;