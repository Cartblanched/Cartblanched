import React from 'react';
import BasketItem from './BasketItem.jsx';


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
    basketComponent = (
      this.state.items.map((item, termIndex) => {
        if (item.items) {
          return (
            <div>
              <div className="ui segment">
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
            </div>
          )
        } else {
          return (
            <div className="ui segment topmargin">
              <h3>No results found for: '{item.name}'</h3>
            </div>
          )
        }
      })
    )

    return (
      <div>
        { this.state.items.length > 0 &&
          <div className="ui grid">
            <div className="ten wide column basketHeader">
              <h2>In Your Basket</h2>
            </div>
            <div className="six wide column topmargin">
              <button
                className="ui right floated button basketButton"
                onClick={this.props.handleCart}
              >
                Add to cart
              </button>
            </div>
          </div>
        }
        {basketComponent}
      </div>
    )
  }
}

export default BasketList;