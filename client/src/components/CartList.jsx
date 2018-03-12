import React from 'react';
import CartItem from './CartItem.jsx';
import { Button, Item } from 'semantic-ui-react';

class CartList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cartItems: this.props.items,
      total: 0
    };
    this.handleQuanityChange = this.handleQuanityChange.bind(this);
    this.handleAddToCart = this.handleAddToCart.bind(this);
    this.handleRemoveFromCart = this.handleRemoveFromCart.bind(this);
    this.calculateTotalCost = this.calculateTotalCost.bind(this);
  }

  calculateTotalCost() {
    let totalCost = 0;
    this.state.cartItems.forEach((item) => {
      if (item.quantity) {
        totalCost += item.quantity * item.salePrice;
      }
    });
    return totalCost.toFixed(2);
  }

  handleAddToCart() {
    let items = [];
    for (var i = 0; i < this.state.cartItems.length; i++) {
      let item = this.state.cartItems[i];
      if (typeof(item.quantity) !== "number") {
        console.log('Need to set all quantities');
        return;
      }
      items.push(`${item.itemId}|${item.quantity}`);
    }
    items = items.join(',');
    while(this.state.cartItems.length) {
      this.state.cartItems.pop();
    }
    this.setState({
      cartItems: this.state.cartItems
    });
    window.open(
      `http://c.affil.walmart.com/t/affsdk?l=http://affil.walmart.com/cart/buynow?items=${items}&wmlspartner=&affsdktrack=trackingid&veh=aff&affs=sdk&affsdktype=html&affsdkcomp=buynowbutton&colorscheme=orange&sizescheme=compact`,
      "_blank"
    );
  }

  handleRemoveFromCart(index) {
    this.state.cartItems.splice(index, 1);
    let cost = this.calculateTotalCost();
    this.setState({
      cartItems: this.state.cartItems,
      total: cost
    });
  }

  handleQuanityChange(id, value) {
    this.state.cartItems.forEach((item) => {
      if (item.itemId === id) {
        item.quantity = value;
      }
    });
    let cost = this.calculateTotalCost();
    this.setState({
      cartItems: this.state.cartItems,
      total: cost
    });
  }

  render() {
    let cartComponent = null;
    if (this.state.cartItems.length === 0) {
      cartComponent = (
        <div className="ui segment">
          <h3>Your cart is currently empty! Search for recipes and create a cart!</h3>
        </div>
      )
    } else {
      cartComponent = (
      <div>
        <div className='ui segment'>
          <Item.Group divided>
          { this.state.cartItems.map((item, index) =>
              <CartItem
                key={index}
                index={index}
                item={item}
                updateQuantity={this.handleQuanityChange}
                handleRemove={this.handleRemoveFromCart}
              />
            )
          }
          </Item.Group>
        </div>
        <div className="ui stackable grid">

            <div className="right floated right aligned column">
              <div className="ui left action input">
                <button
                  className="ui labeled icon button basketButton"
                  onClick={this.handleAddToCart}
                >
                  <i className="cart icon"></i>
                  Checkout
                </button>
                <input type="text" value={`$${this.state.total}`} readOnly />
              </div>
            </div>

        </div>
      </div>
      )
    }
    return (
      <div className='ui container topmargin'>
        <h2>In Your Cart</h2>
        {cartComponent}
      </div>
    )
  }
}

export default CartList;
