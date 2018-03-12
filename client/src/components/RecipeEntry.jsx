import React from 'react';

var RecipeEntry = (props) => {
  if (props.recipe !== undefined) {
  return (
      <div>
        <div onClick = {() => props.onRecipeClick(props.recipe)}> {props.recipe.title} </div>
        <div> <img src={props.recipe.image} alt="" /> </div>
        <div> Likes: {props.recipe.likes} </div>
      </div>
    );
  } else {
    return (<div></div>)
  }
}

export default RecipeEntry;