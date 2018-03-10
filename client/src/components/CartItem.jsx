import React from 'react';
import { Button, Item, Icon, Dropdown } from 'semantic-ui-react';

const options = [
  { key: 1, text: '1', value: 1 },
  { key: 2, text: '2', value: 2 },
  { key: 3, text: '3', value: 3 },
  { key: 4, text: '4', value: 4 },
  { key: 5, text: '5', value: 5 },
]

class CartItem extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e, { value }) {
    this.props.updateQuantity(this.props.item.itemId, value);
  }

  render() {
    const { item } = this.props;
    return (
      <Item>
        <Item.Image size='tiny' src={item.mediumImage} />
        <Item.Content verticalAlign='middle'>
        <Item.Header>{item.name}</Item.Header>
        <Icon
          onClick={() => {
            this.props.handleRemove(this.props.index);
          }}
          size="large"
          className="right floated"
          name="remove"
        />
        <Item.Description>
            Price: ${item.salePrice}
        </Item.Description>
        <Item.Description>
          <Dropdown
            placeholder='Qty.'
            compact
            selection
            options={options}
            value={item.quantity}
            onChange={this.handleChange}
          />
        </Item.Description>
        </Item.Content>

      </Item>
    )
  }
}

export default CartItem;
