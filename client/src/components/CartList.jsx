import React from 'react';
import CartItem from './CartItem.jsx';
import { Button, Item } from 'semantic-ui-react';

class CartList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cartItems: cartItems,
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

const cartItems = [
  {
      "quantity": null,
      "itemId": 10304399,
      "parentItemId": 10304399,
      "name": "Dole Apples & Creme Parfait, 17.2 oz",
      "salePrice": 2.24,
      "upc": "038900030148",
      "categoryPath": "Food/Snacks, Cookies & Chips/Fruit Cups & Fruit Sauces",
      "longDescription": "&lt;ul class=&quot;noindent&quot;&gt;&lt;li&gt;Does not require refrigeration before opening&lt;/li&gt;&lt;li&gt;All natural fruit&lt;/li&gt;&lt;li&gt;Rich in vitamin C&lt;/li&gt;&lt;li&gt;130 calories&lt;br&gt;&lt;br&gt;&lt;/li&gt;&lt;/ul&gt;",
      "thumbnailImage": "https://i5.walmartimages.com/asr/a0a5f56a-28a7-41e4-88db-1e6025c4e4da_1.b9c92f41257719c50dc0e4e70f3dec05.jpeg?odnHeight=100&odnWidth=100&odnBg=FFFFFF",
      "mediumImage": "https://i5.walmartimages.com/asr/a0a5f56a-28a7-41e4-88db-1e6025c4e4da_1.b9c92f41257719c50dc0e4e70f3dec05.jpeg?odnHeight=180&odnWidth=180&odnBg=FFFFFF",
      "largeImage": "https://i5.walmartimages.com/asr/a0a5f56a-28a7-41e4-88db-1e6025c4e4da_1.b9c92f41257719c50dc0e4e70f3dec05.jpeg?odnHeight=450&odnWidth=450&odnBg=FFFFFF",
      "productTrackingUrl": "http://linksynergy.walmart.com/fs-bin/click?id=|LSNID|&offerid=223073.7200&type=14&catid=8&subid=0&hid=7200&tmpid=1082&RD_PARM1=https%253A%252F%252Fwww.walmart.com%252Fip%252FDole-Apples-Creme-Parfait-17-2-oz%252F10304399%253Faffp1%253DkvbuZXPc3N3bE003KuartHuz60EEPyKcpByLGQ7rDqk%2526affilsrc%253Dapi",
      "standardShipRate": 5.99,
      "marketplace": false,
      "modelNumber": "641",
      "productUrl": "http://c.affil.walmart.com/t/api02?l=https%3A%2F%2Fwww.walmart.com%2Fip%2FDole-Apples-Creme-Parfait-17-2-oz%2F10304399%3Faffp1%3DkvbuZXPc3N3bE003KuartHuz60EEPyKcpByLGQ7rDqk%26affilsrc%3Dapi%26veh%3Daff%26wmlspartner%3Dreadonlyapi",
      "customerRating": "4.292",
      "numReviews": 24,
      "customerRatingImage": "http://i2.walmartimages.com/i/CustRating/4_3.gif",
      "categoryNode": "976759_976787_1044133",
      "bundle": false,
      "stock": "Available",
      "addToCartUrl": "http://c.affil.walmart.com/t/api02?l=http%3A%2F%2Faffil.walmart.com%2Fcart%2FaddToCart%3Fitems%3D10304399%7C1%26affp1%3DkvbuZXPc3N3bE003KuartHuz60EEPyKcpByLGQ7rDqk%26affilsrc%3Dapi%26veh%3Daff%26wmlspartner%3Dreadonlyapi",
      "affiliateAddToCartUrl": "http://linksynergy.walmart.com/fs-bin/click?id=|LSNID|&offerid=223073.7200&type=14&catid=8&subid=0&hid=7200&tmpid=1082&RD_PARM1=http%253A%252F%252Faffil.walmart.com%252Fcart%252FaddToCart%253Fitems%253D10304399%257C1%2526affp1%253DkvbuZXPc3N3bE003KuartHuz60EEPyKcpByLGQ7rDqk%2526affilsrc%253Dapi",
      "imageEntities": [
          {
              "thumbnailImage": "https://i5.walmartimages.com/asr/a508a4bb-9105-40e8-8a17-b4babd1e7443_1.2fa84effd505bb8e562ce4fc2e3786be.jpeg?odnHeight=100&odnWidth=100&odnBg=FFFFFF",
              "mediumImage": "https://i5.walmartimages.com/asr/a508a4bb-9105-40e8-8a17-b4babd1e7443_1.2fa84effd505bb8e562ce4fc2e3786be.jpeg?odnHeight=180&odnWidth=180&odnBg=FFFFFF",
              "largeImage": "https://i5.walmartimages.com/asr/a508a4bb-9105-40e8-8a17-b4babd1e7443_1.2fa84effd505bb8e562ce4fc2e3786be.jpeg?odnHeight=450&odnWidth=450&odnBg=FFFFFF",
              "entityType": "SECONDARY"
          },
          {
              "thumbnailImage": "https://i5.walmartimages.com/asr/4d006eb3-ab19-4645-be72-74c6f3977ed5_1.587507da9e02928e411f014fbddbabe9.jpeg?odnHeight=100&odnWidth=100&odnBg=FFFFFF",
              "mediumImage": "https://i5.walmartimages.com/asr/4d006eb3-ab19-4645-be72-74c6f3977ed5_1.587507da9e02928e411f014fbddbabe9.jpeg?odnHeight=180&odnWidth=180&odnBg=FFFFFF",
              "largeImage": "https://i5.walmartimages.com/asr/4d006eb3-ab19-4645-be72-74c6f3977ed5_1.587507da9e02928e411f014fbddbabe9.jpeg?odnHeight=450&odnWidth=450&odnBg=FFFFFF",
              "entityType": "SECONDARY"
          },
          {
              "thumbnailImage": "https://i5.walmartimages.com/asr/87d944b8-7986-45b2-88da-4efa1e50f39a_1.97bf66ed4d05b504bc456e560ed79ecb.jpeg?odnHeight=100&odnWidth=100&odnBg=FFFFFF",
              "mediumImage": "https://i5.walmartimages.com/asr/87d944b8-7986-45b2-88da-4efa1e50f39a_1.97bf66ed4d05b504bc456e560ed79ecb.jpeg?odnHeight=180&odnWidth=180&odnBg=FFFFFF",
              "largeImage": "https://i5.walmartimages.com/asr/87d944b8-7986-45b2-88da-4efa1e50f39a_1.97bf66ed4d05b504bc456e560ed79ecb.jpeg?odnHeight=450&odnWidth=450&odnBg=FFFFFF",
              "entityType": "SECONDARY"
          },
          {
              "thumbnailImage": "https://i5.walmartimages.com/asr/bceef0c3-c1bf-4d59-8f93-2d1ac8a2eb27_1.4646830895715bfe43bb8c18f957f952.jpeg?odnHeight=100&odnWidth=100&odnBg=FFFFFF",
              "mediumImage": "https://i5.walmartimages.com/asr/bceef0c3-c1bf-4d59-8f93-2d1ac8a2eb27_1.4646830895715bfe43bb8c18f957f952.jpeg?odnHeight=180&odnWidth=180&odnBg=FFFFFF",
              "largeImage": "https://i5.walmartimages.com/asr/bceef0c3-c1bf-4d59-8f93-2d1ac8a2eb27_1.4646830895715bfe43bb8c18f957f952.jpeg?odnHeight=450&odnWidth=450&odnBg=FFFFFF",
              "entityType": "SECONDARY"
          },
          {
              "thumbnailImage": "https://i5.walmartimages.com/asr/c4999d40-99ff-4358-a75d-a4ba65e9eb46_1.638ceb864c3825adc7f14499e636675e.jpeg?odnHeight=100&odnWidth=100&odnBg=FFFFFF",
              "mediumImage": "https://i5.walmartimages.com/asr/c4999d40-99ff-4358-a75d-a4ba65e9eb46_1.638ceb864c3825adc7f14499e636675e.jpeg?odnHeight=180&odnWidth=180&odnBg=FFFFFF",
              "largeImage": "https://i5.walmartimages.com/asr/c4999d40-99ff-4358-a75d-a4ba65e9eb46_1.638ceb864c3825adc7f14499e636675e.jpeg?odnHeight=450&odnWidth=450&odnBg=FFFFFF",
              "entityType": "SECONDARY"
          },
          {
              "thumbnailImage": "https://i5.walmartimages.com/asr/a0a5f56a-28a7-41e4-88db-1e6025c4e4da_1.b9c92f41257719c50dc0e4e70f3dec05.jpeg?odnHeight=100&odnWidth=100&odnBg=FFFFFF",
              "mediumImage": "https://i5.walmartimages.com/asr/a0a5f56a-28a7-41e4-88db-1e6025c4e4da_1.b9c92f41257719c50dc0e4e70f3dec05.jpeg?odnHeight=180&odnWidth=180&odnBg=FFFFFF",
              "largeImage": "https://i5.walmartimages.com/asr/a0a5f56a-28a7-41e4-88db-1e6025c4e4da_1.b9c92f41257719c50dc0e4e70f3dec05.jpeg?odnHeight=450&odnWidth=450&odnBg=FFFFFF",
              "entityType": "PRIMARY"
          }
      ],
      "offerType": "ONLINE_AND_STORE",
      "isTwoDayShippingEligible": true,
      "availableOnline": true
  },
  {
      "quantity": null,
      "itemId": 19400322,
      "parentItemId": 19400322,
      "name": "Glory Foods Sweet Traditions Fried Apples, 15.5 OZ",
      "salePrice": 1.48,
      "upc": "736393540013",
      "categoryPath": "Food/Meal Solutions, Grains & Pasta/Canned Goods/Canned Fruit",
      "longDescription": "&lt;br&gt;&lt;b&gt;Glory Foods Sweet Traditions Fried Apples:&lt;/b&gt;&lt;br&gt;&lt;ul&gt;&lt;li&gt;Slow simmered in a sweet and buttery cinnamon sauce&lt;/li&gt;&lt;li&gt;Good taste for the table, good taste for the soul&lt;/li&gt;&lt;li&gt;14.5 oz of canned fried apples&lt;/li&gt;&lt;li&gt;Contains milk; may contains peanuts and soy&lt;/li&gt;&lt;/ul&gt;",
      "thumbnailImage": "https://i5.walmartimages.com/asr/bef072d6-5463-4ae8-a06c-7362374c4241_1.77a9349f96792045bb9cdb4e3f02dc83.jpeg?odnHeight=100&odnWidth=100&odnBg=FFFFFF",
      "mediumImage": "https://i5.walmartimages.com/asr/bef072d6-5463-4ae8-a06c-7362374c4241_1.77a9349f96792045bb9cdb4e3f02dc83.jpeg?odnHeight=180&odnWidth=180&odnBg=FFFFFF",
      "largeImage": "https://i5.walmartimages.com/asr/bef072d6-5463-4ae8-a06c-7362374c4241_1.77a9349f96792045bb9cdb4e3f02dc83.jpeg?odnHeight=450&odnWidth=450&odnBg=FFFFFF",
      "productTrackingUrl": "http://linksynergy.walmart.com/fs-bin/click?id=|LSNID|&offerid=223073.7200&type=14&catid=8&subid=0&hid=7200&tmpid=1082&RD_PARM1=https%253A%252F%252Fwww.walmart.com%252Fip%252FGlory-Foods-Sweet-Traditions-Fried-Apples-15-5-OZ%252F19400322%253Faffp1%253DkvbuZXPc3N3bE003KuartHuz60EEPyKcpByLGQ7rDqk%2526affilsrc%253Dapi",
      "standardShipRate": 5.99,
      "marketplace": false,
      "modelNumber": "54001",
      "productUrl": "http://c.affil.walmart.com/t/api02?l=https%3A%2F%2Fwww.walmart.com%2Fip%2FGlory-Foods-Sweet-Traditions-Fried-Apples-15-5-OZ%2F19400322%3Faffp1%3DkvbuZXPc3N3bE003KuartHuz60EEPyKcpByLGQ7rDqk%26affilsrc%3Dapi%26veh%3Daff%26wmlspartner%3Dreadonlyapi",
      "customerRating": "4.5",
      "numReviews": 2,
      "customerRatingImage": "http://i2.walmartimages.com/i/CustRating/4_5.gif",
      "categoryNode": "976759_976794_976785",
      "bundle": false,
      "stock": "Available",
      "addToCartUrl": "http://c.affil.walmart.com/t/api02?l=http%3A%2F%2Faffil.walmart.com%2Fcart%2FaddToCart%3Fitems%3D19400322%7C1%26affp1%3DkvbuZXPc3N3bE003KuartHuz60EEPyKcpByLGQ7rDqk%26affilsrc%3Dapi%26veh%3Daff%26wmlspartner%3Dreadonlyapi",
      "affiliateAddToCartUrl": "http://linksynergy.walmart.com/fs-bin/click?id=|LSNID|&offerid=223073.7200&type=14&catid=8&subid=0&hid=7200&tmpid=1082&RD_PARM1=http%253A%252F%252Faffil.walmart.com%252Fcart%252FaddToCart%253Fitems%253D19400322%257C1%2526affp1%253DkvbuZXPc3N3bE003KuartHuz60EEPyKcpByLGQ7rDqk%2526affilsrc%253Dapi",
      "imageEntities": [
          {
              "thumbnailImage": "https://i5.walmartimages.com/asr/489c543c-49b4-40e4-92f8-1a33bfd115e8_2.a732e7f8759145e1474aba2b4f844368.png?odnHeight=100&odnWidth=100&odnBg=FFFFFF",
              "mediumImage": "https://i5.walmartimages.com/asr/489c543c-49b4-40e4-92f8-1a33bfd115e8_2.a732e7f8759145e1474aba2b4f844368.png?odnHeight=180&odnWidth=180&odnBg=FFFFFF",
              "largeImage": "https://i5.walmartimages.com/asr/489c543c-49b4-40e4-92f8-1a33bfd115e8_2.a732e7f8759145e1474aba2b4f844368.png?odnHeight=450&odnWidth=450&odnBg=FFFFFF",
              "entityType": "SECONDARY"
          },
          {
              "thumbnailImage": "https://i5.walmartimages.com/asr/bef072d6-5463-4ae8-a06c-7362374c4241_1.77a9349f96792045bb9cdb4e3f02dc83.jpeg?odnHeight=100&odnWidth=100&odnBg=FFFFFF",
              "mediumImage": "https://i5.walmartimages.com/asr/bef072d6-5463-4ae8-a06c-7362374c4241_1.77a9349f96792045bb9cdb4e3f02dc83.jpeg?odnHeight=180&odnWidth=180&odnBg=FFFFFF",
              "largeImage": "https://i5.walmartimages.com/asr/bef072d6-5463-4ae8-a06c-7362374c4241_1.77a9349f96792045bb9cdb4e3f02dc83.jpeg?odnHeight=450&odnWidth=450&odnBg=FFFFFF",
              "entityType": "PRIMARY"
          }
      ],
      "offerType": "ONLINE_AND_STORE",
      "isTwoDayShippingEligible": true,
      "availableOnline": true
  },
  {
      "quantity": null,
      "itemId": 20854310,
      "parentItemId": 20854310,
      "name": "Luck's Fried Apples With Cinnamon, 15.0 OZ",
      "salePrice": 1.64,
      "upc": "884395062474",
      "categoryPath": "Food/Meal Solutions, Grains & Pasta/Canned Goods/Canned Fruit",
      "shortDescription": "&lt;p&gt;Luck's Fried Apples with Cinnamon provides real Southern taste for any meal. The authentic Southern flavor of Luck's Fried Apples brings that country-style taste to any meal. As a side dish with dinner, served with pancakes, or over ice cream, Luck's Fried Apples have the flavor of the South you love.&lt;/p&gt;",
      "longDescription": "&lt;ul&gt;&lt;li&gt;Luck's&reg; Fried Apples With Cinnamon.&lt;/li&gt;&lt;li&gt;Authentic southern taste!.&lt;/li&gt;&lt;li&gt;Fat free.&lt;/li&gt;&lt;li&gt;Net Wt 15 oz (425 g).&lt;/li&gt;&lt;/ul&gt;",
      "thumbnailImage": "https://i5.walmartimages.com/asr/6dea3fed-b84f-4f9a-8477-84d384af394a_1.720d176de9b866323a6ed5ac80bcd083.jpeg?odnHeight=100&odnWidth=100&odnBg=FFFFFF",
      "mediumImage": "https://i5.walmartimages.com/asr/6dea3fed-b84f-4f9a-8477-84d384af394a_1.720d176de9b866323a6ed5ac80bcd083.jpeg?odnHeight=180&odnWidth=180&odnBg=FFFFFF",
      "largeImage": "https://i5.walmartimages.com/asr/6dea3fed-b84f-4f9a-8477-84d384af394a_1.720d176de9b866323a6ed5ac80bcd083.jpeg?odnHeight=450&odnWidth=450&odnBg=FFFFFF",
      "productTrackingUrl": "http://linksynergy.walmart.com/fs-bin/click?id=|LSNID|&offerid=223073.7200&type=14&catid=8&subid=0&hid=7200&tmpid=1082&RD_PARM1=https%253A%252F%252Fwww.walmart.com%252Fip%252FLuck-s-Fried-Apples-With-Cinnamon-15-0-OZ%252F20854310%253Faffp1%253DkvbuZXPc3N3bE003KuartHuz60EEPyKcpByLGQ7rDqk%2526affilsrc%253Dapi",
      "standardShipRate": 5.99,
      "marketplace": false,
      "modelNumber": "06247",
      "productUrl": "http://c.affil.walmart.com/t/api02?l=https%3A%2F%2Fwww.walmart.com%2Fip%2FLuck-s-Fried-Apples-With-Cinnamon-15-0-OZ%2F20854310%3Faffp1%3DkvbuZXPc3N3bE003KuartHuz60EEPyKcpByLGQ7rDqk%26affilsrc%3Dapi%26veh%3Daff%26wmlspartner%3Dreadonlyapi",
      "customerRating": "4.667",
      "numReviews": 6,
      "customerRatingImage": "http://i2.walmartimages.com/i/CustRating/4_7.gif",
      "categoryNode": "976759_976794_976785",
      "bundle": false,
      "stock": "Available",
      "addToCartUrl": "http://c.affil.walmart.com/t/api02?l=http%3A%2F%2Faffil.walmart.com%2Fcart%2FaddToCart%3Fitems%3D20854310%7C1%26affp1%3DkvbuZXPc3N3bE003KuartHuz60EEPyKcpByLGQ7rDqk%26affilsrc%3Dapi%26veh%3Daff%26wmlspartner%3Dreadonlyapi",
      "affiliateAddToCartUrl": "http://linksynergy.walmart.com/fs-bin/click?id=|LSNID|&offerid=223073.7200&type=14&catid=8&subid=0&hid=7200&tmpid=1082&RD_PARM1=http%253A%252F%252Faffil.walmart.com%252Fcart%252FaddToCart%253Fitems%253D20854310%257C1%2526affp1%253DkvbuZXPc3N3bE003KuartHuz60EEPyKcpByLGQ7rDqk%2526affilsrc%253Dapi",
      "imageEntities": [
          {
              "thumbnailImage": "https://i5.walmartimages.com/asr/0af6b0fc-46fb-46c9-aff0-2f196863992a_1.07408858d077a6958518e1b64dc35125.jpeg?odnHeight=100&odnWidth=100&odnBg=FFFFFF",
              "mediumImage": "https://i5.walmartimages.com/asr/0af6b0fc-46fb-46c9-aff0-2f196863992a_1.07408858d077a6958518e1b64dc35125.jpeg?odnHeight=180&odnWidth=180&odnBg=FFFFFF",
              "largeImage": "https://i5.walmartimages.com/asr/0af6b0fc-46fb-46c9-aff0-2f196863992a_1.07408858d077a6958518e1b64dc35125.jpeg?odnHeight=450&odnWidth=450&odnBg=FFFFFF",
              "entityType": "SECONDARY"
          },
          {
              "thumbnailImage": "https://i5.walmartimages.com/asr/e15a287a-bbc0-468f-9733-58fe95ba12b7_1.9b8d06478500d6853d5e81f552ec49c3.jpeg?odnHeight=100&odnWidth=100&odnBg=FFFFFF",
              "mediumImage": "https://i5.walmartimages.com/asr/e15a287a-bbc0-468f-9733-58fe95ba12b7_1.9b8d06478500d6853d5e81f552ec49c3.jpeg?odnHeight=180&odnWidth=180&odnBg=FFFFFF",
              "largeImage": "https://i5.walmartimages.com/asr/e15a287a-bbc0-468f-9733-58fe95ba12b7_1.9b8d06478500d6853d5e81f552ec49c3.jpeg?odnHeight=450&odnWidth=450&odnBg=FFFFFF",
              "entityType": "SECONDARY"
          },
          {
              "thumbnailImage": "https://i5.walmartimages.com/asr/3c216b8a-d44e-4320-aff5-4a44d1c8a6a3_2.b509a9d6fd74a783bc2dcedc28da5544.png?odnHeight=100&odnWidth=100&odnBg=FFFFFF",
              "mediumImage": "https://i5.walmartimages.com/asr/3c216b8a-d44e-4320-aff5-4a44d1c8a6a3_2.b509a9d6fd74a783bc2dcedc28da5544.png?odnHeight=180&odnWidth=180&odnBg=FFFFFF",
              "largeImage": "https://i5.walmartimages.com/asr/3c216b8a-d44e-4320-aff5-4a44d1c8a6a3_2.b509a9d6fd74a783bc2dcedc28da5544.png?odnHeight=450&odnWidth=450&odnBg=FFFFFF",
              "entityType": "SECONDARY"
          },
          {
              "thumbnailImage": "https://i5.walmartimages.com/asr/bf127d2b-6299-4cb3-b92b-0131f5dd6496_2.2460833dd4d05257fb2b23b895668e78.png?odnHeight=100&odnWidth=100&odnBg=FFFFFF",
              "mediumImage": "https://i5.walmartimages.com/asr/bf127d2b-6299-4cb3-b92b-0131f5dd6496_2.2460833dd4d05257fb2b23b895668e78.png?odnHeight=180&odnWidth=180&odnBg=FFFFFF",
              "largeImage": "https://i5.walmartimages.com/asr/bf127d2b-6299-4cb3-b92b-0131f5dd6496_2.2460833dd4d05257fb2b23b895668e78.png?odnHeight=450&odnWidth=450&odnBg=FFFFFF",
              "entityType": "SECONDARY"
          },
          {
              "thumbnailImage": "https://i5.walmartimages.com/asr/ebeeab7d-158f-46d5-bb4a-34106e46f86b_2.0c152b1a591d70bf63bef58220b32c46.png?odnHeight=100&odnWidth=100&odnBg=FFFFFF",
              "mediumImage": "https://i5.walmartimages.com/asr/ebeeab7d-158f-46d5-bb4a-34106e46f86b_2.0c152b1a591d70bf63bef58220b32c46.png?odnHeight=180&odnWidth=180&odnBg=FFFFFF",
              "largeImage": "https://i5.walmartimages.com/asr/ebeeab7d-158f-46d5-bb4a-34106e46f86b_2.0c152b1a591d70bf63bef58220b32c46.png?odnHeight=450&odnWidth=450&odnBg=FFFFFF",
              "entityType": "SECONDARY"
          },
          {
              "thumbnailImage": "https://i5.walmartimages.com/asr/7b036c6b-6b68-4c8e-a740-ee28a4227005_2.e071bb938390ac9b22a5e5110d7cc779.png?odnHeight=100&odnWidth=100&odnBg=FFFFFF",
              "mediumImage": "https://i5.walmartimages.com/asr/7b036c6b-6b68-4c8e-a740-ee28a4227005_2.e071bb938390ac9b22a5e5110d7cc779.png?odnHeight=180&odnWidth=180&odnBg=FFFFFF",
              "largeImage": "https://i5.walmartimages.com/asr/7b036c6b-6b68-4c8e-a740-ee28a4227005_2.e071bb938390ac9b22a5e5110d7cc779.png?odnHeight=450&odnWidth=450&odnBg=FFFFFF",
              "entityType": "SECONDARY"
          },
          {
              "thumbnailImage": "https://i5.walmartimages.com/asr/9c590e3e-3bf9-482d-b898-20524eecce81_1.597b72d2c5050b4667723bdbe62a2375.png?odnHeight=100&odnWidth=100&odnBg=FFFFFF",
              "mediumImage": "https://i5.walmartimages.com/asr/9c590e3e-3bf9-482d-b898-20524eecce81_1.597b72d2c5050b4667723bdbe62a2375.png?odnHeight=180&odnWidth=180&odnBg=FFFFFF",
              "largeImage": "https://i5.walmartimages.com/asr/9c590e3e-3bf9-482d-b898-20524eecce81_1.597b72d2c5050b4667723bdbe62a2375.png?odnHeight=450&odnWidth=450&odnBg=FFFFFF",
              "entityType": "SECONDARY"
          },
          {
              "thumbnailImage": "https://i5.walmartimages.com/asr/6dea3fed-b84f-4f9a-8477-84d384af394a_1.720d176de9b866323a6ed5ac80bcd083.jpeg?odnHeight=100&odnWidth=100&odnBg=FFFFFF",
              "mediumImage": "https://i5.walmartimages.com/asr/6dea3fed-b84f-4f9a-8477-84d384af394a_1.720d176de9b866323a6ed5ac80bcd083.jpeg?odnHeight=180&odnWidth=180&odnBg=FFFFFF",
              "largeImage": "https://i5.walmartimages.com/asr/6dea3fed-b84f-4f9a-8477-84d384af394a_1.720d176de9b866323a6ed5ac80bcd083.jpeg?odnHeight=450&odnWidth=450&odnBg=FFFFFF",
              "entityType": "PRIMARY"
          }
      ],
      "offerType": "ONLINE_AND_STORE",
      "isTwoDayShippingEligible": true,
      "availableOnline": true
  },
  {
      "quantity": null,
      "itemId": 155457325,
      "parentItemId": 155457325,
      "name": "WhiteHouse Scalloped Apples Cinnamon, 15.0 OZ",
      "salePrice": 3.01,
      "upc": "043600003019",
      "categoryPath": "Food/Meal Solutions, Grains & Pasta/Canned Goods/Canned Fruit",
      "shortDescription": "WhiteHouse&reg; Scalloped Apples Cinnamon. Made from homegrown apples. There is no high fructose corn syrup.",
      "longDescription": "&lt;ul&gt;&lt;li&gt;WhiteHouse&reg; Scalloped Apples Cinnamon.&lt;/li&gt;&lt;li&gt;Since 1908.&lt;/li&gt;&lt;li&gt;From Our House to Yours... White House.&lt;/li&gt;&lt;li&gt;No High Fructose Corn Syrup.&lt;/li&gt;&lt;/ul&gt;",
      "thumbnailImage": "https://i5.walmartimages.com/asr/7ded7ed5-c765-4961-b305-84ea0a1d5952_1.e4b60ce19725d76e788c5d6d19a87293.jpeg?odnHeight=100&odnWidth=100&odnBg=FFFFFF",
      "mediumImage": "https://i5.walmartimages.com/asr/7ded7ed5-c765-4961-b305-84ea0a1d5952_1.e4b60ce19725d76e788c5d6d19a87293.jpeg?odnHeight=180&odnWidth=180&odnBg=FFFFFF",
      "largeImage": "https://i5.walmartimages.com/asr/7ded7ed5-c765-4961-b305-84ea0a1d5952_1.e4b60ce19725d76e788c5d6d19a87293.jpeg?odnHeight=450&odnWidth=450&odnBg=FFFFFF",
      "productTrackingUrl": "http://linksynergy.walmart.com/fs-bin/click?id=|LSNID|&offerid=223073.7200&type=14&catid=8&subid=0&hid=7200&tmpid=1082&RD_PARM1=https%253A%252F%252Fwww.walmart.com%252Fip%252FWhiteHouse-Scalloped-Apples-Cinnamon-15-0-OZ%252F155457325%253Faffp1%253DkvbuZXPc3N3bE003KuartHuz60EEPyKcpByLGQ7rDqk%2526affilsrc%253Dapi",
      "standardShipRate": 5.99,
      "marketplace": false,
      "modelNumber": "254",
      "productUrl": "http://c.affil.walmart.com/t/api02?l=https%3A%2F%2Fwww.walmart.com%2Fip%2FWhiteHouse-Scalloped-Apples-Cinnamon-15-0-OZ%2F155457325%3Faffp1%3DkvbuZXPc3N3bE003KuartHuz60EEPyKcpByLGQ7rDqk%26affilsrc%3Dapi%26veh%3Daff%26wmlspartner%3Dreadonlyapi",
      "categoryNode": "976759_976794_976785",
      "bundle": false,
      "stock": "Available",
      "addToCartUrl": "http://c.affil.walmart.com/t/api02?l=http%3A%2F%2Faffil.walmart.com%2Fcart%2FaddToCart%3Fitems%3D155457325%7C1%26affp1%3DkvbuZXPc3N3bE003KuartHuz60EEPyKcpByLGQ7rDqk%26affilsrc%3Dapi%26veh%3Daff%26wmlspartner%3Dreadonlyapi",
      "affiliateAddToCartUrl": "http://linksynergy.walmart.com/fs-bin/click?id=|LSNID|&offerid=223073.7200&type=14&catid=8&subid=0&hid=7200&tmpid=1082&RD_PARM1=http%253A%252F%252Faffil.walmart.com%252Fcart%252FaddToCart%253Fitems%253D155457325%257C1%2526affp1%253DkvbuZXPc3N3bE003KuartHuz60EEPyKcpByLGQ7rDqk%2526affilsrc%253Dapi",
      "giftOptions": {
          "allowGiftWrap": false,
          "allowGiftMessage": false,
          "allowGiftReceipt": false
      },
      "imageEntities": [
          {
              "thumbnailImage": "https://i5.walmartimages.com/asr/a6990cc2-45d1-437a-8349-ff537d635412_1.d544e295280f1cdae915f407047850f8.jpeg?odnHeight=100&odnWidth=100&odnBg=FFFFFF",
              "mediumImage": "https://i5.walmartimages.com/asr/a6990cc2-45d1-437a-8349-ff537d635412_1.d544e295280f1cdae915f407047850f8.jpeg?odnHeight=180&odnWidth=180&odnBg=FFFFFF",
              "largeImage": "https://i5.walmartimages.com/asr/a6990cc2-45d1-437a-8349-ff537d635412_1.d544e295280f1cdae915f407047850f8.jpeg?odnHeight=450&odnWidth=450&odnBg=FFFFFF",
              "entityType": "SECONDARY"
          },
          {
              "thumbnailImage": "https://i5.walmartimages.com/asr/b70ac952-d588-4c83-b1b9-f85dbf089696_1.59abc2e16871b6a8d85c18d803ae5bb2.jpeg?odnHeight=100&odnWidth=100&odnBg=FFFFFF",
              "mediumImage": "https://i5.walmartimages.com/asr/b70ac952-d588-4c83-b1b9-f85dbf089696_1.59abc2e16871b6a8d85c18d803ae5bb2.jpeg?odnHeight=180&odnWidth=180&odnBg=FFFFFF",
              "largeImage": "https://i5.walmartimages.com/asr/b70ac952-d588-4c83-b1b9-f85dbf089696_1.59abc2e16871b6a8d85c18d803ae5bb2.jpeg?odnHeight=450&odnWidth=450&odnBg=FFFFFF",
              "entityType": "SECONDARY"
          },
          {
              "thumbnailImage": "https://i5.walmartimages.com/asr/1f33ffbf-51a5-4ae0-9b24-7291ab95b319_2.950480837580b2978dae410031c69e5e.png?odnHeight=100&odnWidth=100&odnBg=FFFFFF",
              "mediumImage": "https://i5.walmartimages.com/asr/1f33ffbf-51a5-4ae0-9b24-7291ab95b319_2.950480837580b2978dae410031c69e5e.png?odnHeight=180&odnWidth=180&odnBg=FFFFFF",
              "largeImage": "https://i5.walmartimages.com/asr/1f33ffbf-51a5-4ae0-9b24-7291ab95b319_2.950480837580b2978dae410031c69e5e.png?odnHeight=450&odnWidth=450&odnBg=FFFFFF",
              "entityType": "SECONDARY"
          },
          {
              "thumbnailImage": "https://i5.walmartimages.com/asr/2a05cd92-fe40-4419-8a6d-ff3a2a73f823_2.37ab4560fb8c91754030a6bae5288646.png?odnHeight=100&odnWidth=100&odnBg=FFFFFF",
              "mediumImage": "https://i5.walmartimages.com/asr/2a05cd92-fe40-4419-8a6d-ff3a2a73f823_2.37ab4560fb8c91754030a6bae5288646.png?odnHeight=180&odnWidth=180&odnBg=FFFFFF",
              "largeImage": "https://i5.walmartimages.com/asr/2a05cd92-fe40-4419-8a6d-ff3a2a73f823_2.37ab4560fb8c91754030a6bae5288646.png?odnHeight=450&odnWidth=450&odnBg=FFFFFF",
              "entityType": "SECONDARY"
          },
          {
              "thumbnailImage": "https://i5.walmartimages.com/asr/f7017519-5fd6-42d5-a9ad-53f2cb62f96d_2.2e50d6b4d7e137c3f15791c3820b95b6.png?odnHeight=100&odnWidth=100&odnBg=FFFFFF",
              "mediumImage": "https://i5.walmartimages.com/asr/f7017519-5fd6-42d5-a9ad-53f2cb62f96d_2.2e50d6b4d7e137c3f15791c3820b95b6.png?odnHeight=180&odnWidth=180&odnBg=FFFFFF",
              "largeImage": "https://i5.walmartimages.com/asr/f7017519-5fd6-42d5-a9ad-53f2cb62f96d_2.2e50d6b4d7e137c3f15791c3820b95b6.png?odnHeight=450&odnWidth=450&odnBg=FFFFFF",
              "entityType": "SECONDARY"
          },
          {
              "thumbnailImage": "https://i5.walmartimages.com/asr/ccf4666b-7fec-4164-98d8-a12ff792d4a6_2.b505b0f6730c0354a74f322ec1585691.png?odnHeight=100&odnWidth=100&odnBg=FFFFFF",
              "mediumImage": "https://i5.walmartimages.com/asr/ccf4666b-7fec-4164-98d8-a12ff792d4a6_2.b505b0f6730c0354a74f322ec1585691.png?odnHeight=180&odnWidth=180&odnBg=FFFFFF",
              "largeImage": "https://i5.walmartimages.com/asr/ccf4666b-7fec-4164-98d8-a12ff792d4a6_2.b505b0f6730c0354a74f322ec1585691.png?odnHeight=450&odnWidth=450&odnBg=FFFFFF",
              "entityType": "SECONDARY"
          },
          {
              "thumbnailImage": "https://i5.walmartimages.com/asr/b3edcd13-7fe5-4be6-b8ca-b4b3e989960e_1.e9bef3f47beef73c54505ad58fc038fb.png?odnHeight=100&odnWidth=100&odnBg=FFFFFF",
              "mediumImage": "https://i5.walmartimages.com/asr/b3edcd13-7fe5-4be6-b8ca-b4b3e989960e_1.e9bef3f47beef73c54505ad58fc038fb.png?odnHeight=180&odnWidth=180&odnBg=FFFFFF",
              "largeImage": "https://i5.walmartimages.com/asr/b3edcd13-7fe5-4be6-b8ca-b4b3e989960e_1.e9bef3f47beef73c54505ad58fc038fb.png?odnHeight=450&odnWidth=450&odnBg=FFFFFF",
              "entityType": "SECONDARY"
          },
          {
              "thumbnailImage": "https://i5.walmartimages.com/asr/7ded7ed5-c765-4961-b305-84ea0a1d5952_1.e4b60ce19725d76e788c5d6d19a87293.jpeg?odnHeight=100&odnWidth=100&odnBg=FFFFFF",
              "mediumImage": "https://i5.walmartimages.com/asr/7ded7ed5-c765-4961-b305-84ea0a1d5952_1.e4b60ce19725d76e788c5d6d19a87293.jpeg?odnHeight=180&odnWidth=180&odnBg=FFFFFF",
              "largeImage": "https://i5.walmartimages.com/asr/7ded7ed5-c765-4961-b305-84ea0a1d5952_1.e4b60ce19725d76e788c5d6d19a87293.jpeg?odnHeight=450&odnWidth=450&odnBg=FFFFFF",
              "entityType": "PRIMARY"
          }
      ],
      "offerType": "ONLINE_AND_STORE",
      "isTwoDayShippingEligible": true,
      "availableOnline": true
  },
]

