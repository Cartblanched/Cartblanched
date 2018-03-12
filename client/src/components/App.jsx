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
import DragDrop from './DragDrop.jsx';
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
      recipeList: recipeObj.frontpage,
      focalRecipe: sampleRecipe,
      recipeSearch: '',
      basketItems: [],
      cartItems: [],
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
              <div>
                <FavoritesList
                  favoriteList={this.state.favoriteList}
                  onRecipeClick={this.onRecipeClick}
                  unFavorite={this.unFavorite}
                  currentUser={this.state.currentUser}
                />
                <DragDrop favoriteImages={this.state.favoriteList.map((recipe, index) => {
                  return <img className="dragdrop" src={recipe.image} />
                })}
                />
              </div>
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
  frontpage: [
    {
        "id": 3339,
        "title": "Sautéed Halibut with Gazpacho Salsa",
        "image": "https://spoonacular.com/recipeImages/3339-312x231.jpg",
        "imageType": "jpg",
        "usedIngredientCount": 1,
        "missedIngredientCount": 2,
        "likes": 0
    },
    {
        "id": 8421,
        "title": "Grilled Pizza With Fontina And Arugula",
        "image": "https://spoonacular.com/recipeImages/8421-312x231.jpg",
        "imageType": "jpg",
        "usedIngredientCount": 1,
        "missedIngredientCount": 2,
        "likes": 6
    },
    {
        "id": 512385,
        "title": "Hawaiian Style Macaroni Salad",
        "image": "https://spoonacular.com/recipeImages/512385-312x231.jpg",
        "imageType": "jpg",
        "usedIngredientCount": 1,
        "missedIngredientCount": 2,
        "likes": 19
    },
    {
        "id": 845323,
        "title": "Salted Caramel Brownie Brittle",
        "image": "https://spoonacular.com/recipeImages/845323-312x231.jpg",
        "imageType": "jpg",
        "usedIngredientCount": 1,
        "missedIngredientCount": 1,
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
    },
    {
        "id": 803029,
        "title": "Bourbon Caramel Donuts",
        "image": "https://spoonacular.com/recipeImages/803029-312x231.jpg",
        "imageType": "jpg",
        "usedIngredientCount": 1,
        "missedIngredientCount": 2,
        "likes": 4
    },
    {
        "id": 492233,
        "title": "Santa Fe Baked Chicken",
        "image": "https://spoonacular.com/recipeImages/492233-312x231.jpg",
        "imageType": "jpg",
        "usedIngredientCount": 1,
        "missedIngredientCount": 0,
        "likes": 107520
    },
    {
        "id": 861108,
        "title": "Sheet Pan Teriyaki Salmon with Green Beans",
        "image": "https://spoonacular.com/recipeImages/861108-312x231.jpg",
        "imageType": "jpg",
        "usedIngredientCount": 1,
        "missedIngredientCount": 2,
        "likes": 0
    },
    {
        "id": 199508,
        "title": "Mixed Greens with Walnut-Fig Vinaigrette",
        "image": "https://spoonacular.com/recipeImages/199508-312x231.jpg",
        "imageType": "jpg",
        "usedIngredientCount": 1,
        "missedIngredientCount": 2,
        "likes": 0
    },
    {
        "id": 69167,
        "title": "Stewed Rhubarb And Raspberries With A Meringue Lattice Crust",
        "image": "https://spoonacular.com/recipeImages/69167-312x231.jpg",
        "imageType": "jpg",
        "usedIngredientCount": 1,
        "missedIngredientCount": 2,
        "likes": 0
    }
]}

let sampleRecipe = {
    "id": 928338,
    "sourceUrl": "https://www.foodiecrush.com/how-to-make-gameday-chicken-wing-platter/",
    "spoonacularSourceUrl": "https://spoonacular.com/crispy-baked-chicken-wings-928338",
    "extendedIngredients": [
        {
            "id": 6150,
            "aisle": "Condiments",
            "image": "https://spoonacular.com/cdn/ingredients_100x100/barbecue-sauce.jpg",
            "consistency": "solid",
            "name": "bbq sauce",
            "amount": 25,
            "unit": "servings",
            "originalString": "Sauce (see ideas below)",
            "metaInformation": [
                "(see ideas below)"
            ]
        },
        {
            "id": 5100,
            "aisle": "Meat",
            "image": "https://spoonacular.com/cdn/ingredients_100x100/chicken-wings.png",
            "consistency": "solid",
            "name": "chicken wings",
            "amount": 2,
            "unit": "pounds",
            "originalString": "2-3 pounds of chicken wings",
            "metaInformation": []
        },
        {
            "id": 1082047,
            "aisle": "Spices and Seasonings",
            "image": "https://spoonacular.com/cdn/ingredients_100x100/salt.jpg",
            "consistency": "solid",
            "name": "kosher salt",
            "amount": 25,
            "unit": "servings",
            "originalString": "Kosher salt and freshly ground black pepper",
            "metaInformation": [
                "black",
                "freshly ground"
            ]
        },
        {
            "id": 4053,
            "aisle": "Oil, Vinegar, Salad Dressing",
            "image": "https://spoonacular.com/cdn/ingredients_100x100/olive-oil.jpg",
            "consistency": "liquid",
            "name": "olive oil",
            "amount": 25,
            "unit": "servings",
            "originalString": "Olive oil",
            "metaInformation": []
        }
    ],
    "title": "Crispy Baked Chicken Wings",
    "image": "https://spoonacular.com/recipeImages/928338-556x370.jpg"
}

const AppWithRouter = withRouter(App);
export default AppWithRouter;