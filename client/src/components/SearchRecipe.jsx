import React from 'react';
const createSeasonResolver = require('date-season');

let formatDate = (date) => {
  let monthNames = [
    "January", "February", "March",
    "April", "May", "June", "July",
    "August", "September", "October",
    "November", "December"
  ];

  let day = date.getDate();
  let monthIndex = date.getMonth();
  let year = date.getFullYear();

  return `${monthNames[monthIndex]} ${day}, ${year}`;
}

let renderToday = () => {
  let today = formatDate(new Date());
  return today;
}

let renderSeason = () => {
  let seasonNorth = createSeasonResolver();
  var currentSeason = seasonNorth(new Date());
  if (currentSeason === 'Winter') {
    return (
      <img src="https://c1.staticflickr.com/5/4784/38912236080_9c415c3f26_m.jpg" />
    )
  } else if (currentSeason === 'Spring') {
    return (
      <img src="https://c1.staticflickr.com/5/4783/26851008678_0625232a85_m.jpg" />
    )
  } else if (currentSeason === 'Summer') {
    return (
      <img src="https://c1.staticflickr.com/5/4779/26851008388_1c0ed1027b_m.jpg" />
    )
  } else if (currentSeason === 'Fall') {
    return (
      <img src="https://c1.staticflickr.com/5/4793/26851008288_66c0043937_m.jpg" />
    )
  }
}

var SearchRecipe = (props) => {
  return (
    <div className="ui segment">
      <div className="seasonlist">
        <p className="eatseasons">Eat the Seasons</p>
        <p>{renderToday()}</p>
        {renderSeason()}
      </div>
      <div class="ui divider"></div>
      <form className="ui form">
        <div className="field">
          <div className="ui header small">Search Recipes</div>
            <div className="ui action input">
              <input
                value={props.recipeSearch}
                name="search-recipe"
                type="text"
                placeholder="Enter Ingredients"
                onChange={props.onRecipeSearch}
              />
              <button
                className="ui icon button"
                onClick={props.onRecipeSearchClick}>
                <i className="search icon hoverstyle"></i>
              </button>
            </div>
        </div>
      </form>
    </div>
  );
}

export default SearchRecipe;