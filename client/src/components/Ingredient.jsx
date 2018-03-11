import React from 'react';

class Ingredient extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <ul>
        <input
          type="checkbox"
          className="checkbox"
          onClick={() => {
            this.props.handleCheck(this.props.ingredient.id);
          }}
          checked={this.props.ingredient.checked}
        />
        {this.props.ingredient.originalString}
      </ul>
    )
  }
}

export default Ingredient;