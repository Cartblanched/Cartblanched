import React from 'react';
import $ from 'jquery';
import { withRouter } from 'react-router';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  Redirect
} from 'react-router-dom';

import AllRecipesList from './AllRecipesList.jsx';
import FavoritesList from './FavoritesList.jsx';
import SearchRecipe from './SearchRecipe.jsx';
import FocalRecipe from './FocalRecipe.jsx';
import RecipeEntry from './RecipeEntry.jsx';
import SearchUser from './SearchUser.jsx';
import Signup from './Signup.jsx';
import Login from './Login.jsx';
import Nav from './Nav.jsx';
import '../styles/app.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: '',
      recipeList: recipeObj.fakeRecipes,
      favoriteList: favoriteRecipes.fakeRecipes,
      focalRecipe: sampleRecipe,
      userSearch: '',
      recipeSearch: '',
      favoriteError: false,
      favoriteSuccess: false,
      loggedIn: false,
    };

    this.signupSubmit = this.signupSubmit.bind(this);
    this.loginSubmit = this.loginSubmit.bind(this);
    this.onRecipeClick = this.onRecipeClick.bind(this);
    this.addFavorite = this.addFavorite.bind(this);
    this.onUserSearchClick = this.onUserSearchClick.bind(this);
    this.onUserSearch = this.onUserSearch.bind(this);
    this.onRecipeSearch = this.onRecipeSearch.bind(this);
    this.onRecipeSearchClick = this.onRecipeSearchClick.bind(this);
  }

  signupSubmit(signup) {
    let obj = { email: `${signup.email}`, username: `${signup.username}`, password: `${signup.password}`};
    $.ajax({
      type: 'POST',
      url: '/signup',
      data: obj,
      success: (res) => {
        if (res.status === 200) {
          this.setState({
            loggedIn: true
          });
        };
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  loginSubmit(login) {
    let obj = { username: `${login.username}`, password: `${login.password}` };
    $.ajax({
      type: 'POST',
      url: '/login',
      data: obj,
      success: (res) => {
        if (res.status === 200) {
          this.setState({
            loggedIn: true
          });
        };
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  logoutSubmit() {
    $.get('/logout');
  }

  //When recipe in either favorites or all recipes list is clicked, make API request for more detailed data object for target recipe and load into focal recipe component
  onRecipeClick (recipe) {
    var component = this;
    $.ajax({
      type: 'GET',
      url: '/recipe/' + recipe.id,
      success: (recipe) => {
        component.setState({
          focalRecipe: recipe
        });
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  //search for username in database and pull all favorited recipes for that user
  onUserSearchClick(e) {
    e.preventDefault();
    this.setState({
      currentUser: this.state.userSearch + "'s",
      favoriteError: false
    })
    let component = this;
    $.ajax({
      type: 'GET',
      url: '/db/fetch',
      data: 'username=' + component.state.userSearch,
      success: function(favRecipesData) {
        component.setState({
          favoriteList: favRecipesData,
        });
      },
      error: function(err) {
        console.log(err);
      }
    });
  }

  onUserSearch(e) {
    this.setState({
      userSearch: e.target.value
    });
  }

  onRecipeSearch(e) {
    this.setState({
      recipeSearch: e.target.value
    });
  }

  //add get request for new recipes from server
  onRecipeSearchClick(e) {
    //prevent the component from re-rendering when recipe search form is submitted
    e.preventDefault();
    //if user enters multiple ingredients that are not comma delimited, make them comma delimited
    var searchIngredients;
    if (!this.state.recipeSearch.includes(',')) {
      searchIngredients = this.state.recipeSearch.split(' ').join(', ');
    } else {
      searchIngredients = this.state.recipeSearch;
    }
    var component = this;
    $.ajax({
      type: 'GET',
      url: '/recipes?ingredients=' + searchIngredients,
      success:function(recipesData) {
        component.setState({
          recipeList: recipesData
        });
      },
      error: function(err) {
        console.log(err);
      }
    });
  }

  //post request to store favorite in database for user
  addFavorite (recipe) {
    var component = this;
    if (component.state.userSearch === '') {
      component.setState({
        favoriteError: true
      });
      console.log(this.state.favoriteError, 'error');
    } else {
      component.setState({
        favoriteError: false,
      });
      $.ajax({
        method: 'POST',
        url: '/db/save',
        data: {
          username: component.state.userSearch,
          id: component.state.focalRecipe.id,
          title: component.state.focalRecipe.title,
          image: component.state.focalRecipe.image,
          likes: component.state.focalRecipe.likes,
          extendedIngredients: component.state.focalRecipe.extendedIngredients
        },
        success: (res) => {
          //component.onUserSearchClick();
          component.setState({
            favoriteSuccess: true
          });
          $.ajax({
            type: 'GET',
            url: '/db/fetch',
            data: 'username=' + component.state.userSearch,
            success: function(favRecipesData) {
              component.setState({
                favoriteList: favRecipesData,
              });
            },
            error: function(err) {
              console.log(err);
            }
          });
        },
        error: (err) => {
          console.log(err);
        }
      });
    }
  }

  render() {
    return (
      <div>
        <Nav />

        <Route
          exact path="/login"
          render={ () =>
            <div className="ui container">
              <Login loginSubmit={this.loginSubmit}/>
            </div>
          }
        />

        <div className="ui container">

          {/*<h1 class="ui aligned center header segment">
            <img src="..dist/egg-icon.png"/>
            Cartblanched
          </h1>*/}

          <Route
            exact path="/signup"
            render={ () =>
              <Signup signupSubmit={this.signupSubmit}/>
            }
          />

          <Route
            exact path="/favorites"
            render={ () =>
              <FavoritesList
                favoriteList = {this.state.favoriteList}
                onRecipeClick = {this.onRecipeClick}
                currentUser = {this.state.currentUser}
              />
            }
          />

          <Route
            exact path="/"
            render={ () =>
              <div>
                <div className="ui two column stackable grid">
                  <div className="ten wide column">
                    <div className="ui segment">
                      <div >
                        <FocalRecipe
                        focalRecipe = {this.state.focalRecipe}
                        recipeList = {this.state.recipeList}
                        addFavorite = {this.addFavorite}
                        favoriteError = {this.state.favoriteError}
                        favoriteSuccess = {this.state.favoriteSuccess}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="six wide column">
                    <div>
                      <SearchRecipe
                      onRecipeSearch = {this.onRecipeSearch}
                      onRecipeSearchClick = {this.onRecipeSearchClick}
                      recipeSearch = {this.state.recipeSearch}
                      />

                      <SearchUser
                      onUserSearchClick = {this.onUserSearchClick}
                      userSearch = {this.state.userSearch}
                      onUserSearch = {this.onUserSearch}
                      />
                    </div>
                  </div>
                </div>

                <AllRecipesList
                onRecipeClick = {this.onRecipeClick}
                recipeList= {this.state.recipeList}
                />
              </div>
            }
          />
        </div>
      </div>
    );
  }
}

var favoriteRecipes = {fakeRecipes: [
    {
        "id": 933310,
        "title": "2 Ingredient Instant Pot Applesauce",
        "image": "https://spoonacular.com/recipeImages/933310-312x231.jpg",
        "imageType": "jpg",
        "usedIngredientCount": 1,
        "missedIngredientCount": 0,
        "likes": 0
    },
    {
        "id": 936707,
        "title": "Dried Apples",
        "image": "https://spoonacular.com/recipeImages/936707-312x231.jpg",
        "imageType": "jpg",
        "usedIngredientCount": 1,
        "missedIngredientCount": 1,
        "likes": 265
    },
]}

var recipeObj = {fakeRecipes: [
    {
        "id": 933310,
        "title": "2 Ingredient Instant Pot Applesauce",
        "image": "https://spoonacular.com/recipeImages/933310-312x231.jpg",
        "imageType": "jpg",
        "usedIngredientCount": 1,
        "missedIngredientCount": 0,
        "likes": 0
    },
    {
        "id": 936707,
        "title": "Dried Apples",
        "image": "https://spoonacular.com/recipeImages/936707-312x231.jpg",
        "imageType": "jpg",
        "usedIngredientCount": 1,
        "missedIngredientCount": 1,
        "likes": 265
    },
    {
        "id": 721001,
        "title": "Apple Fruit Baskets",
        "image": "https://spoonacular.com/recipeImages/721001-312x231.jpg",
        "imageType": "jpg",
        "usedIngredientCount": 1,
        "missedIngredientCount": 2,
        "likes": 45
    },
    {
        "id": 65597,
        "title": "Cinnamon Streusel Muffins",
        "image": "https://spoonacular.com/recipeImages/65597-312x231.jpg",
        "imageType": "jpg",
        "usedIngredientCount": 1,
        "missedIngredientCount": 2,
        "likes": 0
    },
    {
        "id": 163949,
        "title": "Pork Chops with Apples and Sage",
        "image": "https://spoonacular.com/recipeImages/163949-312x231.jpg",
        "imageType": "jpg",
        "usedIngredientCount": 1,
        "missedIngredientCount": 2,
        "likes": 0
    }
]}

var sampleRecipe =
{   "id": 197109,
    "sourceUrl": "http://www.myrecipes.com/recipe/slow-cooker-pot-roast-50400000131366/",
    "spoonacularSourceUrl": "https://spoonacular.com/four-ingredient-slow-cooker-pot-roast-197109",
    "extendedIngredients": [
        {
            "originalString": "1 (12-oz.) can beer",
            "name": "beer",
            "amount": 12,
            "unit": "oz"
        },
        {
            "originalString": "1 tablespoon canola oil",
            "name": "canola oil",
            "amount": 1,
            "unit": "tablespoon"
        },
        {
            "originalString": "1 (3- to 4-lb.) chuck roast, trimmed",
            "name": "chuck roast",
            "amount": 3,
            "unit": "lb"
        },
        {
            "originalString": "1 (0.7-oz.) envelope Italian dressing mix",
            "name": "ranch dressing mix",
            "amount": 0.7,
            "unit": "oz"
        }
    ],
    "title": "Four-Ingredient Slow-Cooker Pot Roast",
    "image": "https://spoonacular.com/recipeImages/197109-556x370.jpg"
}

const AppWithRouter = withRouter(App);
export default AppWithRouter;
