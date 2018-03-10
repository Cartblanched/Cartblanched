import React from 'react';

const style = {
  backgroundColor: "#88C057"
}

var SearchRecipe = (props) => {
  return (
    <div className="ui segment">
      <form className="ui form">
        <div className="field">
          <div className="ui header small">Search Recipes Starring</div>
          <input value={props.recipeSearch} name="search-recipe" type="text" onChange={props.onRecipeSearch}/>
        </div>
          <button
            style={style}
            className="ui button"
            onClick={props.onRecipeSearchClick}>
            Search
          </button>
      </form>
    </div>
  );
}

export default SearchRecipe;