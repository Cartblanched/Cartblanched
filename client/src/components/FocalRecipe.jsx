import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import ErrorMessage from './Error.jsx';
import SuccessMessage from './Success.jsx';
import Ingredient from './Ingredient.jsx';
import { Button, Dimmer, Loader, Popup, Image } from 'semantic-ui-react';
import '../styles/app.css';

class FocalRecipe extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      areaCode: '',
      prefix: '',
      lineNum: '',
      phoneSuccess: false,
      favePopup: false,
      textPopup: false,
      textIngredients: false,
      active: false
    };
    this.sendNumber = this.sendNumber.bind(this);
    this.onAreaCodeEntry = this.onAreaCodeEntry.bind(this);
    this.onPrefixEntry = this.onPrefixEntry.bind(this);
    this.onLineNumEntry = this.onLineNumEntry.bind(this);
    this.handleFavoriteClick = this.handleFavoriteClick.bind(this);
    this.handleFaveOpen = this.handleFaveOpen.bind(this);
    this.handleFaveClose = this.handleFaveClose.bind(this);
    this.handleTextOpen = this.handleTextOpen.bind(this);
    this.handleTextClose = this.handleTextClose.bind(this);
    this.showRecipe = this.showRecipe.bind(this);
    this.hideRecipe = this.hideRecipe.bind(this);
  }

  showRecipe() {
    this.setState({ active: true })
  }
  hideRecipe() {
    this.setState({ active: false })
  }

  handleFaveOpen() {
    this.setState({ favePopup: true});

    this.timeout = setTimeout(() => {
      this.setState({ favePopup: false });
    }, 2000);
  }

  handleFaveClose() {
    this.setState({ favePopup: false });
    clearTimeout(this.timeout);
  }

  handleTextOpen() {
    // Hacky solution to make sure we display the right "popup" message
    setTimeout(() => {
      this.setState({ textPopup: true });
    }, 100);

    this.timeout = setTimeout(() => {
      this.setState({ textPopup: false });
    }, 2000);
  }

  handleTextClose() {
    this.setState({ textPopup: false });
    clearTimeout(this.timeout);
  }



  onAreaCodeEntry(e) {
    this.setState({
      areaCode: e.target.value
    })
  }

  onPrefixEntry(e) {
    this.setState({
      prefix: e.target.value
    })
  }

  onLineNumEntry(e) {
    this.setState({
      lineNum: e.target.value
    })
  }

  //send text message to user-inputted phone number, containing ingredients from recipe data loaded into the focal recipe component
  sendNumber() {
    let textIngredients = [];
    this.props.focalRecipe.extendedIngredients.forEach((ingredient) => {
      if (ingredient.checked) {
        textIngredients.push(ingredient);
      }
    });
    if (textIngredients.length === 0) {
      this.setState({
        textIngredients: false
      });
      return;
    } else {
      this.setState({
        textIngredients: true
      });
    }
    var phoneNumber = '1' + this.state.areaCode + this.state.prefix + this.state.lineNum;
    if (phoneNumber.length !== 11) {
      this.setState({
        phoneSuccess: false
      });
    } else {
      // Overly complex algorithm for creating ingredients string to send through text
      var ingredientsMessage = 'Could you please make me ' + this.props.focalRecipe.title + '? ' + 'The ingredients needed are: ' + textIngredients.reduce((ingredients, ingredient) => ingredients + ingredient.amount + ' ' + ingredient.unit + ' ' + ingredient.name + ', ', '');
      ingredientsMessage = ingredientsMessage.slice(0, -2);
      var component = this;
      $.ajax({
        method: 'POST',
        url: '/sendText',
        data: JSON.stringify({
          number: phoneNumber,
          ingredients: ingredientsMessage
        }),
        contentType: 'application/json',
        success: (res) => {
          component.setState({
            phoneSuccess: true
          })
        },
        error: (err) => {
          console.log('phone number failed to send');
        }
      });
    }
  }

  handleFavoriteClick() {
    let recipe = this.props.focalRecipe;
    this.props.addFavorite(recipe);
  }

  render() {
    let faveContent = this.props.loggedIn ? "Added to favorites!" : "Create an account to access this feature :)";
    let textContent = "";
    if (!this.state.textIngredients) {
      textContent = "Select some ingredients to get texted!";
    } else {
      textContent = this.state.phoneSuccess ? "Text Sent!" : "Invalid Phone Number";
    }

    const { active } = this.state;
    const content = (
      <a href={this.props.focalRecipe.sourceUrl} target="_blank">
       <div className="ui button recipeButton">View Full Recipe</div>
      </a>
    );

    return (
      <div>
      <div className="ui two column stackable grid">
        <Dimmer active={this.props.recipeLoading} inverted>
          <Loader />
        </Dimmer>
        <div className="10 wide column">
          <h3>{this.props.focalRecipe.title}</h3>
            <Dimmer.Dimmable
              as={Image}
              dimmed={active}
              dimmer={{ active, content }}
              onMouseEnter={this.showRecipe}
              onMouseLeave={this.hideRecipe}
              className="rounded image"
              src={this.props.focalRecipe.image}
            />

        </div>
        <div className="6 wide column">
          <div className="content">
            <div className="ui centered header small">Ingredients</div>
          </div>

          <div className="extra content">
            {this.props.focalRecipe.extendedIngredients.map((ingredient, index) =>
              <Ingredient
                key={index}
                handleCheck={this.props.handleCheck}
                ingredient={ingredient}
              />
            )}
          </div>
        </div>
      </div>
      <div className="textingredients">
        <form className="ui form">
          <div className="ui header small">Text Ingredients</div>
          <div className="inline fields">
              <div className="five wide field">
                <div className="ui mini input inputStyle">
                  <input
                    value={this.state.areaCode}
                    onChange={this.onAreaCodeEntry}
                    type="text"
                    placeholder="xxx"
                  />
                </div>
              </div>
              <div className="five wide field">
                <div className="ui mini input inputStyle">
                  <input
                    value={this.state.prefix}
                    onChange={this.onPrefixEntry}
                    type="text"
                    placeholder="xxx"
                  />
                </div>
              </div>
              <div className="six wide field">
                <div className="ui mini input inputStyle">
                  <input
                    value={this.state.lineNum}
                    onChange={this.onLineNumEntry}
                    type="text"
                    placeholder="xxxx"
                  />
                </div>
              </div>
          </div>
        </form>
      </div>
        <div className="three ui buttons">
          <Popup
            trigger={
              <button
                className="ui button textButton"
                onClick={this.sendNumber}
              >
                Send Text
              </button>
            }
            content={textContent}
            on='click'
            open={this.state.textPopup}
            onClose={this.handleTextClose}
            onOpen={this.handleTextOpen}
            position='top right'
          />
          <Popup
            trigger={
              <button
                className="favoriteButton ui button"
                onClick={this.handleFavoriteClick}
              >
              <i className="heart icon"></i>
              Favorite
              </button>
            }
            content={faveContent}
            on='click'
            open={this.state.favePopup}
            onClose={this.handleFaveClose}
            onOpen={this.handleFaveOpen}
            position='top right'
          />
          <Button
            className="ui button right floated basketButton"
            onClick={this.props.handleBasket}
            loading={this.props.basketLoading}
          >
            Create Basket
          </Button>
        </div>
      </div>
    );
  }
}

export default FocalRecipe;
