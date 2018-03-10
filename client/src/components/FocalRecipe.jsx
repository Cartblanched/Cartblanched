import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import ErrorMessage from './Error.jsx';
import SuccessMessage from './Success.jsx';
import Ingredient from './Ingredient.jsx';
import { Button, Dimmer, Loader } from 'semantic-ui-react';
import '../styles/app.css';

class FocalRecipe extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      areaCode: '',
      prefix: '',
      lineNum: '',
      phoneError: false,
      phoneSuccess: false
    };
    this.sendNumber = this.sendNumber.bind(this);
    this.onAreaCodeEntry = this.onAreaCodeEntry.bind(this);
    this.onPrefixEntry = this.onPrefixEntry.bind(this);
    this.onLineNumEntry = this.onLineNumEntry.bind(this);
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
    console.log('Should be texting the following ingredients: ');
    this.props.focalRecipe.extendedIngredients.forEach((ingredient) => {
      if (ingredient.checked) {
        console.log(ingredient);
      }
    })
    // var phoneNumber = '1' + this.state.areaCode + this.state.prefix + this.state.lineNum;
    // if (phoneNumber.length !== 11) {
    //   this.setState({
    //     phoneError: true,
    //     phoneSuccess: false
    //   });
    // } else {
    //   this.setState({
    //     phoneError: false
    //   });
    //   //Overly complex algorithm for creating ingredients string to send through text
    //   var ingredientsMessage = 'Could you please make me ' + this.props.focalRecipe.title + '? ' + 'The ingredients needed are: ' + this.props.focalRecipe.extendedIngredients.reduce((ingredients, ingredient) => ingredients + ingredient.amount + ' ' + ingredient.unit + ' ' + ingredient.name + ', ', '');
    //   ingredientsMessage = ingredientsMessage.slice(0, -2);
    //   var component = this;
    //   $.ajax({
    //     method: 'POST',
    //     url: '/sendText',
    //     data: JSON.stringify({
    //       number: phoneNumber,
    //       ingredients: ingredientsMessage
    //     }),
    //     contentType: 'application/json',
    //     success: (res) => {
    //       component.setState({
    //         phoneSuccess: true
    //       })
    //     },
    //     error: (err) => {
    //       console.log('phone number failed to send');
    //     }
    //   });
    // }
  }

  render() {
    return (
      <div>

      <div className="ui two column stackable grid">
        <Dimmer active={this.props.recipeLoading} inverted>
          <Loader />
        </Dimmer>
        <div className="10 wide column">
          <h3>{this.props.focalRecipe.title}</h3>
          <div>
            <a href={this.props.focalRecipe.sourceUrl} target="_blank">
              <img
                className="ui centered rounded image" src={this.props.focalRecipe.image}
              />
            </a>
          </div>
        </div>
        <div className="6 wide column">
          <div className="content">
            <div className="ui centered header small">Ingredients</div>
          </div>

          <div className="extra content">
            {this.props.focalRecipe.extendedIngredients.map((ingredient) =>
              <Ingredient handleCheck={this.props.handleCheck} ingredient={ingredient} />
            )}
          </div>
        </div>

      </div>

        <form className="ui form">
          <div className="ui header small">Text Ingredients</div>
          <div className="inline fields">
              <div className="five wide field">
                <div className="ui mini input inputStyle">
                  <input value={this.state.areaCode} onChange={this.onAreaCodeEntry} type="text" placeholder="(xxx)" />
                </div>
              </div>
              <div className="five wide field">
                <div className="ui mini input inputStyle">
                  <input value={this.state.prefix} onChange={this.onPrefixEntry} type="text" placeholder="xxx" />
                </div>
              </div>
              <div className="six wide field">
                <div className="ui mini input inputStyle">
                  <input value={this.state.lineNum} onChange={this.onLineNumEntry} type="text" placeholder="xxxx" />
                </div>
              </div>
          </div>
        </form>
        {
          this.state.phoneError ?
            <ErrorMessage
              message = {"Invalid Phone Number"}
            /> : null
        }
        {
          this.state.phoneSuccess ?
            <SuccessMessage
              message = {"Text Sent!"}
            /> : null
        }
        {
          this.props.favoriteError ?
            <ErrorMessage
              message = {"Enter a username before adding a favorite"}
            /> : null
        }
        {
          this.props.favoriteSuccess ?
            <SuccessMessage
              message = {"Added to Favorites!"}
            /> : null
        }
        <div className="three ui buttons">
          <button
            className="ui button textButton"
            onClick={this.sendNumber}
          >
              Send Text
          </button>
          <button
            className="favoriteButton ui button"
            onClick={this.props.addFavorite}
          >
            <i className="heart icon"></i>
            Favorite
          </button>
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
