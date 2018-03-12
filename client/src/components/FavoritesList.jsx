import React from 'react';

class FavoritesList extends React.Component {
  constructor(props) {
    super(props);
    this.handleUnFavoriteClick = this.handleUnFavoriteClick.bind(this);
  }

  handleUnFavoriteClick(recipe) {
    this.props.unFavorite(recipe);
  }

  render() {
   if (this.props.favoriteList.length === 0) {
      return (
        <div className="ui segment topmargin">
          <h3>{this.props.currentUser}'s Favorite Recipes </h3>
          <div>0 Favorites</div>
        </div>
      )
    } else {
      return (
        <div className="ui segment topmargin">
          <h3>{this.props.currentUser}'s Favorite Recipes </h3>

          <div className="ui five link cards">
            {this.props.favoriteList.map((recipe, index) =>
              <div
                key={index}
                className="card"
              >
                <div
                  className="image"
                  onClick = {() => this.props.onRecipeClick(recipe)}
                >
                  <img src={recipe.image}/>
                </div>
                <div className="content">
                  <div className="description">{recipe.title}</div>
                </div>
                <div
                  className="ui bottom attached button"
                  onClick={() => {this.handleUnFavoriteClick(recipe)}}
                >
                  Remove
                </div>
              </div>
            )}
          </div>
        </div>
      );
    }
  }
}

export default FavoritesList;
