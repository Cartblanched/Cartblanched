import React from 'react';
import { Button } from 'semantic-ui-react';

function BasketItem(props) {
  return (
    <div className="card">
      <img className="small centered image" src={props.item.mediumImage}/>
      <div className="content">
        <div className="header">{props.item.name}</div>
      </div>

      <div className="extra content">
        <span>
          Price: ${props.item.salePrice}
        </span>
      </div>
      <Button
        onClick={() =>
          {props.handleClick(props.index)}
        }
        attached="bottom"
        toggle
        active={props.item.carted}
      >
        <i className="shop icon"></i>
        Add to cart
      </Button>
    </div>
  )
}

export default BasketItem;

/*
#FBCB5C
#F29F6B
    <div className="card">
      <img className='right floated mini image' src={props.item.mediumImage}/>
      <div className="content">
        <div className="header">{props.item.name}</div>
      </div>

      <div className="extra content">
        <span>
          Price: ${props.item.salePrice}
        </span>
      </div>
    </div>

    <div class="card">
    <div class="content">
      <img class="tiny ui image" src={props.item.mediumImage} />
      <div class="header">
        {props.item.name}
      </div>

      <div class="description">
        Price: ${props.item.salePrice}
      </div>
    </div>
  </div>
*/
