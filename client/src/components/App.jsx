import React from 'react';
import $ from 'jquery';
import cookie from 'react-cookie';
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
import BasketList from './BasketList.jsx';
import Signup from './Signup.jsx';
import Login from './Login.jsx';
import GoogleAd from './Ad.jsx';
import Nav from './Nav.jsx';
import '../styles/app.css';
import CartList from './CartList.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: '',
      loggedIn: false,
      activeItem: 'Home',
      recipeList: recipeObj.fakeRecipes,
      focalRecipe: sampleRecipe,
      recipeSearch: '',
      basketItems: [],
      cartItems: [],
      favoriteList: [],
      loggedIn: false,
      activeItem: 'Home',
      basketLoading: false,
      recipeLoading: false,
      searchLoading: false
    };

    this.handleNavItemClick = this.handleNavItemClick.bind(this);
    this.signupSubmit = this.signupSubmit.bind(this);
    this.loginSubmit = this.loginSubmit.bind(this);
    this.onRecipeClick = this.onRecipeClick.bind(this);
    this.addFavorite = this.addFavorite.bind(this);
    this.unFavorite = this.unFavorite.bind(this);
    this.onRecipeSearch = this.onRecipeSearch.bind(this);
    this.onRecipeSearchClick = this.onRecipeSearchClick.bind(this);
    this.onIngredientCheck = this.onIngredientCheck.bind(this);
    this.createBasket = this.createBasket.bind(this);
    this.createCart = this.createCart.bind(this);
  }

  componentDidMount() {
    if (cookie.load('loggedIn') === 'true' && this.state.loggedIn === false) {
      let currentUser = cookie.load('username');
      this.setState({
        loggedIn: true,
        currentUser: currentUser
      });
      $.ajax({
        type: 'GET',
        url: '/favorites',
        success: (data) => {
          this.setState({
            favoriteList: data[0].favorites,
          });
        },
        error: (err) => {
          console.log(err);
        }
      });
    }
  }

  handleNavItemClick(e, { name }) {
    this.setState({
      activeItem: name
    });
  }

  signupSubmit(signup) {
    let obj = {
      email: `${signup.email}`,
      username: `${signup.username}`,
      password: `${signup.password}`
    };
    $.ajax({
      type: 'POST',
      url: '/signup',
      data: obj,
      success: (res, textStatus, jqXHR) => {
        if (jqXHR.status === 200) {
          this.setState({
            activeItem: 'Login'
          });
          this.props.history.push(`/login`);
        }
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  loginSubmit(login) {
    let obj = {
      username: `${login.username}`,
      password: `${login.password}`
    };
    $.ajax({
      type: 'POST',
      url: '/login',
      data: obj,
      success: (res, textStatus, jqXHR) => {
        if (jqXHR.status === 200) {
          this.setState({
            loggedIn: true,
            activeItem: 'Home',
            currentUser: obj.username
          });
          this.props.history.push(`/`);
        }
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  logoutSubmit() {
    $.get('/logout');
  }

  onRecipeClick (recipe) {
    let component = this;
    component.setState({
      recipeLoading: true
    })
    $.ajax({
      type: 'GET',
      url: '/recipe/' + recipe.id,
      success: (recipe) => {
        recipe.extendedIngredients.forEach((ingredient) => {
          ingredient.checked = false;
        });
        component.setState({
          focalRecipe: recipe,
          recipeLoading: false,
          activeItem: 'Home'
        });
        component.props.history.push('/');
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  onIngredientCheck(id) {
    this.state.focalRecipe.extendedIngredients.forEach((ingredient) => {
      if (ingredient.id === id) {
        ingredient.checked = !ingredient.checked;
      }
    });

    this.setState({
      focalRecipe: this.state.focalRecipe
    });
  }

  onRecipeSearch(e) {
    this.setState({
      recipeSearch: e.target.value
    });
  }

  onRecipeSearchClick(e) {
    e.preventDefault();
    this.setState({
      searchLoading: true
    });
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
      success: (recipesData) => {
        component.setState({
          recipeList: recipesData,
          searchLoading: false
        });
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  addFavorite(recipe) {
    var component = this;
    recipe.username = component.state.currentUser;
    if (!this.state.loggedIn) {
      return;
    } else {
      $.ajax({
        method: 'POST',
        url: '/favorites',
        data: recipe,
        success: (res) => {
          component.setState({
            favoriteSuccess: true
          });
          $.ajax({
            type: 'GET',
            url: '/favorites',
            success: (data) => {
              component.setState({
                favoriteList: data[0].favorites,
              });
            },
            error: (err) => {
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

  unFavorite(recipe) {
    var component = this;
    recipe.username = component.state.currentUser;
    $.ajax({
      method: 'POST',
      url: '/unfavorite',
      data: recipe,
      success: (res) => {
        $.ajax({
          type: 'GET',
          url: '/favorites',
          success: (data) => {
            console.log(data);
            component.setState({
              favoriteList: data[0].favorites,
            });
          },
          error: (err) => {
            console.log(err);
          }
        });
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  createBasket() {
    const component = this;
    let ingredients = [];
    let aisles = [];
    this.state.focalRecipe.extendedIngredients.forEach((ingredient) => {
      if (ingredient.checked) {
        ingredients.push(ingredient.name);
        aisles.push(ingredient.aisle);
      }
    });
    if (ingredients.length > 0) {
      component.setState({
        basketLoading: true
      });
      ingredients = ingredients.join(',');
      aisles = aisles.join('*');
      $.ajax({
        method: 'GET',
        url: `/groceries?ingredients=${ingredients}&aisles=${aisles}`,
        success: (data) => {
          component.setState({
            basketItems: data,
            basketLoading: false
          });
          component.props.history.push('/basket');
        },
        error: (err) => {
          console.log(err);
        }
      });
    }
  }

  createCart() {
    let cart = [];
    this.state.basketItems.forEach((basket) => {
      if (basket.items) {
        basket.items.forEach((item) => {
          if (item.carted) {
            cart.push(item);
          }
        })
      }
    });

    if (cart.length < 0) {
      console.log('Need to have items to be added to cart!');
      return;
    }

    this.setState({
      cartItems: this.state.cartItems.concat(cart),
      activeItem: "Cart"
    });
    this.props.history.push('/cart');
  }

  render() {
    return (
      <div>
        <Nav
          loginStatus={this.state.loggedIn}
          handleNavItemClick={this.handleNavItemClick}
          activeItem={this.state.activeItem}
        />

        <Route
          exact path="/login"
          render={ () =>
            <div className="ui container">
              <Login loginSubmit={this.loginSubmit} />
            </div>
          }
        />

        <div className="ui container">

          <Route
            exact path="/signup"
            render={ () =>
              <Signup signupSubmit={this.signupSubmit}/>
            }
          />

          <Route
            exact path="/faves"
            render={ () =>
              <FavoritesList
                favoriteList={this.state.favoriteList}
                onRecipeClick={this.onRecipeClick}
                unFavorite={this.unFavorite}
                currentUser={this.state.currentUser}
              />
            }
          />

          <Route
            exact path='/basket'
            render={ () =>
              <BasketList
                items={this.state.basketItems}
                handleCart={this.createCart}
              />
            }
          />

          <Route
            exact path='/cart'
            render={ () =>
              <CartList
                items={this.state.cartItems}
                handleCart={this.createCart}
              />
            }
          />

          <Route
            exact path="/"
            render={ () =>
              <div className="topmargin">
                <div className="ui two column stackable grid">
                  <div className="ten wide column">
                    <div className="ui segment">
                      <div>
                        <FocalRecipe
                          focalRecipe={this.state.focalRecipe}
                          recipeList={this.state.recipeList}
                          addFavorite={this.addFavorite}
                          handleCheck={this.onIngredientCheck}
                          handleBasket={this.createBasket}
                          basketLoading={this.state.basketLoading}
                          recipeLoading={this.state.recipeLoading}
                          loggedIn={this.state.loggedIn}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="six wide column">
                    <div>
                      <SearchRecipe
                        onRecipeSearch={this.onRecipeSearch}
                        onRecipeSearchClick={this.onRecipeSearchClick}
                        recipeSearch={this.state.recipeSearch}
                      />
                    </div>
                    <div className="googleAd">
                      <GoogleAd />
                    </div>
                  </div>
                </div>
                <AllRecipesList
                  onRecipeClick={this.onRecipeClick}
                  recipeList={this.state.recipeList}
                  searchLoading={this.state.searchLoading}
                />
              </div>
            }
          />
        </div>
      </div>
    );
  }
}

let recipeObj = {
  fakeRecipes: [
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

let sampleRecipe = {
    "id": 197109,
    "sourceUrl": "http://www.myrecipes.com/recipe/slow-cooker-pot-roast-50400000131366/",
    "spoonacularSourceUrl": "https://spoonacular.com/four-ingredient-slow-cooker-pot-roast-197109",
    "extendedIngredients": [
        {
            "id": 14006,
            "aisle": "Alcoholic Beverages",
            "image": "https://spoonacular.com/cdn/ingredients_100x100/beer.jpg",
            "consistency": "liquid",
            "name": "beer",
            "amount": 12,
            "unit": "oz",
            "originalString": "1 (12-oz.) can beer",
            "metaInformation": [
                "canned"
            ],
            checked: false
        },
        {
            "id": 4582,
            "aisle": "Oil, Vinegar, Salad Dressing",
            "image": "https://spoonacular.com/cdn/ingredients_100x100/vegetable-oil.jpg",
            "consistency": "liquid",
            "name": "canola oil",
            "amount": 1,
            "unit": "tablespoon",
            "originalString": "1 tablespoon canola oil",
            "metaInformation": [],
            checked: false
        },
        {
            "id": 13786,
            "aisle": "Meat",
            "image": "https://spoonacular.com/cdn/ingredients_100x100/beef-chuck-roast.png",
            "consistency": "solid",
            "name": "chuck roast",
            "amount": 3,
            "unit": "lb",
            "originalString": "1 (3- to 4-lb.) chuck roast, trimmed",
            "metaInformation": [
                "trimmed"
            ],
            checked: false
        },
        {
            "id": 93733,
            "aisle": "Oil, Vinegar, Salad Dressing",
            "image": "https://spoonacular.com/cdn/ingredients_100x100/oregano-dried.png",
            "consistency": "solid",
            "name": "ranch dressing mix",
            "amount": 0.7,
            "unit": "oz",
            "originalString": "1 (0.7-oz.) envelope Italian dressing mix",
            "metaInformation": [
                "italian"
            ],
            checked: false
        }
    ],
    "title": "Four-Ingredient Slow-Cooker Pot Roast",
    "image": "https://spoonacular.com/recipeImages/197109-556x370.jpg"
}

const AppWithRouter = withRouter(App);
export default AppWithRouter;