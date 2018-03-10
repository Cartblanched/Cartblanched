import React from 'react';
import BasketItem from './BasketItem.jsx';

const basketButton = {
  backgroundColor: "#FBCB5C"
}

class BasketList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: this.props.items
    };
    this.handleCartAdd = this.handleCartAdd.bind(this);
  }

  handleCartAdd(itemIndex) {
    const itemObj = this.state.items;
    const item = itemObj[itemIndex[0]].items[itemIndex[1]];
    if (item.carted) {
      item.carted = !item.carted;
    } else {
      item.carted = true;
    }
    this.setState({
      items: itemObj
    });
  }

  render() {
    let basketComponent = null;
    if (this.state.items.length === 0) {
      basketComponent = (
        <div className="ui segment topmargin">
          <h3>Your basket is currently empty! Search for recipes and create a basket!</h3>
        </div>
      )
    } else {
      basketComponent = (
        this.state.items.map((item, termIndex) => {
          if (item.items) {
            return (
            <div className="ui segment topmargin">
              <h3>Shopping for: {item.name}</h3>
              <div className="ui five link cards">
                {item.items.map((product, index) => {
                  if (index < 5) {
                    return (
                      <BasketItem
                        index={[termIndex, index]}
                        item={product}
                        handleClick={this.handleCartAdd}
                      />
                    )
                  }
                }
              )}
              </div>
            </div>
            )
          }
          else {
            return (
              <div className="ui segment topmargin">
                <h3>No results found for: '{item.name}'</h3>
              </div>
            )
          }
        })
      )
    }
    return (
      <div>
        {basketComponent}
      </div>
    )
  }
}

export default BasketList;