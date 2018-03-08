import React from 'react';

class Ingredient extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <ul>
        <input
          onClick={() => {
            this.props.handleCheck(this.props.ingredient.id);
          }}
          type="checkbox"
        />
        {this.props.ingredient.originalString}
      </ul>
    )
  }
}

export default Ingredient;