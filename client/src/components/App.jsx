import React from 'react';
import $ from 'jquery';
import { withRouter } from 'react-router';
import cookie from 'react-cookie';
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
      recipeList: recipeObj.fakeRecipes,
      favoriteList: favoriteRecipes.fakeRecipes,
      focalRecipe: sampleRecipe,
      userSearch: '',
      recipeSearch: '',
      basketItems: [],
      cartItems: [],
      favoriteError: false,
      favoriteSuccess: false,
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
        url: '/favorites',
        data: {
          username: component.state.userSearch,
          id: component.state.focalRecipe.id,
          title: component.state.focalRecipe.title,
          image: component.state.focalRecipe.image,
          likes: component.state.focalRecipe.likes,
          extendedIngredients: component.state.focalRecipe.extendedIngredients
        },
        success: (res) => {
          component.setState({
            favoriteSuccess: true
          });
          $.ajax({
            type: 'GET',
            url: '/favorites',
            data: 'username=' + component.state.userSearch,
            success: (favRecipesData) => {
              component.setState({
                favoriteList: favRecipesData,
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
                          favoriteError={this.state.favoriteError}
                          favoriteSuccess={this.state.favoriteSuccess}
                          handleCheck={this.onIngredientCheck}
                          handleBasket={this.createBasket}
                          basketLoading={this.state.basketLoading}
                          recipeLoading={this.state.recipeLoading}
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
            "unit": "oz",
            checked: false
        },
        {
            "originalString": "1 tablespoon canola oil",
            "name": "canola oil",
            "amount": 1,
            "unit": "tablespoon",
            checked: false
        },
        {
            "originalString": "1 (3- to 4-lb.) chuck roast, trimmed",
            "name": "chuck roast",
            "amount": 3,
            "unit": "lb",
            checked: false
        },
        {
            "originalString": "1 (0.7-oz.) envelope Italian dressing mix",
            "name": "ranch dressing mix",
            "amount": 0.7,
            "unit": "oz",
            checked: false
        }
    ],
    "title": "Four-Ingredient Slow-Cooker Pot Roast",
    "image": "https://spoonacular.com/recipeImages/197109-556x370.jpg"
}

const AppWithRouter = withRouter(App);
export default AppWithRouter;