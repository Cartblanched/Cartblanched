import React from 'react';
import RecipeEntry from './RecipeEntry.jsx';

var FavoritesList = (props) => {
  if (props.favoriteList.length === 0) {
    return (
      <div className="ui segment topmargin">
        <h3>{props.currentUser}'s Favorite Recipes </h3>
        <div>No favorites yet.</div>
      </div>
    )
  } else {
    return (
      <div className="ui segment topmargin">
        <h3>{props.currentUser}'s Favorite Recipes </h3>

        <div className="ui five link cards">
          {props.favoriteList.map((recipe) =>

            <div className="card" onClick = {() => props.onRecipeClick(recipe)}>

              <div className="image">
                <img src={recipe.image}/>
              </div>

              <div className="content">
                <div className="header">{recipe.title}</div>
              </div>

            </div>
          )}
        </div>
      </div>
    );
  }
}

export default FavoritesList;
