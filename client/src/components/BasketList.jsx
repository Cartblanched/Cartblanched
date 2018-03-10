import React from 'react';
import BasketItem from './BasketItem.jsx';

class BasketList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: sampleItems
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
    return (
      <div>
        {this.state.items.map((item, termIndex) => {
          return (
          <div className="ui segment topmargin">
            <h3>{item.name}</h3>
            <div className="ui five link cards">
              {item.items.map((product, index) =>
                <BasketItem
                  index={[termIndex, index]}
                  item={product}
                  handleClick={this.handleCartAdd}
                />
              )}
            </div>
          </div>
          )
        })}
      </div>
    )
  }
}

const sampleItems = [
  {
    name: 'Bacon',
    items: [
      {
          "itemId": 51002252,
          "parentItemId": 51002252,
          "name": "Great Value Real Bacon Pieces, 9 Oz",
          "salePrice": 4.98,
          "upc": "078742122632",
          "categoryPath": "Food/Fresh Food/Produce/Salad Toppers",
          "shortDescription": "Needs Clean Up",
          "longDescription": "Great Value Real Bacon Pieces, 9 Oz",
          "thumbnailImage": "https://i5.walmartimages.com/asr/d7607b92-f6a4-4ac4-a516-367db8903ece_1.a958e78342e30948f35c8e158939c069.jpeg?odnHeight=100&odnWidth=100&odnBg=FFFFFF",
          "mediumImage": "https://i5.walmartimages.com/asr/d7607b92-f6a4-4ac4-a516-367db8903ece_1.a958e78342e30948f35c8e158939c069.jpeg?odnHeight=180&odnWidth=180&odnBg=FFFFFF",
          "largeImage": "https://i5.walmartimages.com/asr/d7607b92-f6a4-4ac4-a516-367db8903ece_1.a958e78342e30948f35c8e158939c069.jpeg?odnHeight=450&odnWidth=450&odnBg=FFFFFF",
          "productTrackingUrl": "http://linksynergy.walmart.com/fs-bin/click?id=|LSNID|&offerid=223073.7200&type=14&catid=8&subid=0&hid=7200&tmpid=1082&RD_PARM1=https%253A%252F%252Fwww.walmart.com%252Fip%252FGreat-Value-Real-Bacon-Pieces-9-Oz%252F51002252%253Faffp1%253DkvbuZXPc3N3bE003KuartHuz60EEPyKcpByLGQ7rDqk%2526affilsrc%253Dapi",
          "standardShipRate": 5.99,
          "marketplace": false,
          "modelNumber": "F013526",
          "productUrl": "http://c.affil.walmart.com/t/api02?l=https%3A%2F%2Fwww.walmart.com%2Fip%2FGreat-Value-Real-Bacon-Pieces-9-Oz%2F51002252%3Faffp1%3DkvbuZXPc3N3bE003KuartHuz60EEPyKcpByLGQ7rDqk%26affilsrc%3Dapi%26veh%3Daff%26wmlspartner%3Dreadonlyapi",
          "customerRating": "3.909",
          "numReviews": 55,
          "customerRatingImage": "http://i2.walmartimages.com/i/CustRating/3_9.gif",
          "categoryNode": "976759_1071964_976793",
          "bundle": false,
          "stock": "Available",
          "addToCartUrl": "http://c.affil.walmart.com/t/api02?l=http%3A%2F%2Faffil.walmart.com%2Fcart%2FaddToCart%3Fitems%3D51002252%7C1%26affp1%3DkvbuZXPc3N3bE003KuartHuz60EEPyKcpByLGQ7rDqk%26affilsrc%3Dapi%26veh%3Daff%26wmlspartner%3Dreadonlyapi",
          "affiliateAddToCartUrl": "http://linksynergy.walmart.com/fs-bin/click?id=|LSNID|&offerid=223073.7200&type=14&catid=8&subid=0&hid=7200&tmpid=1082&RD_PARM1=http%253A%252F%252Faffil.walmart.com%252Fcart%252FaddToCart%253Fitems%253D51002252%257C1%2526affp1%253DkvbuZXPc3N3bE003KuartHuz60EEPyKcpByLGQ7rDqk%2526affilsrc%253Dapi",
          "imageEntities": [
              {
                  "thumbnailImage": "https://i5.walmartimages.com/asr/c0234ac4-88b2-44b9-8d02-33924701fe85_1.2fa8fec28d198faaccef0589858b2ba7.jpeg?odnHeight=100&odnWidth=100&odnBg=FFFFFF",
                  "mediumImage": "https://i5.walmartimages.com/asr/c0234ac4-88b2-44b9-8d02-33924701fe85_1.2fa8fec28d198faaccef0589858b2ba7.jpeg?odnHeight=180&odnWidth=180&odnBg=FFFFFF",
                  "largeImage": "https://i5.walmartimages.com/asr/c0234ac4-88b2-44b9-8d02-33924701fe85_1.2fa8fec28d198faaccef0589858b2ba7.jpeg?odnHeight=450&odnWidth=450&odnBg=FFFFFF",
                  "entityType": "SECONDARY"
              },
              {
                  "thumbnailImage": "https://i5.walmartimages.com/asr/c2038524-6d23-4b28-aaef-d83ceaff03d8_1.7e992f8042a5f416386720f692e264b0.jpeg?odnHeight=100&odnWidth=100&odnBg=FFFFFF",
                  "mediumImage": "https://i5.walmartimages.com/asr/c2038524-6d23-4b28-aaef-d83ceaff03d8_1.7e992f8042a5f416386720f692e264b0.jpeg?odnHeight=180&odnWidth=180&odnBg=FFFFFF",
                  "largeImage": "https://i5.walmartimages.com/asr/c2038524-6d23-4b28-aaef-d83ceaff03d8_1.7e992f8042a5f416386720f692e264b0.jpeg?odnHeight=450&odnWidth=450&odnBg=FFFFFF",
                  "entityType": "SECONDARY"
              },
              {
                  "thumbnailImage": "https://i5.walmartimages.com/asr/d7607b92-f6a4-4ac4-a516-367db8903ece_1.a958e78342e30948f35c8e158939c069.jpeg?odnHeight=100&odnWidth=100&odnBg=FFFFFF",
                  "mediumImage": "https://i5.walmartimages.com/asr/d7607b92-f6a4-4ac4-a516-367db8903ece_1.a958e78342e30948f35c8e158939c069.jpeg?odnHeight=180&odnWidth=180&odnBg=FFFFFF",
                  "largeImage": "https://i5.walmartimages.com/asr/d7607b92-f6a4-4ac4-a516-367db8903ece_1.a958e78342e30948f35c8e158939c069.jpeg?odnHeight=450&odnWidth=450&odnBg=FFFFFF",
                  "entityType": "PRIMARY"
              }
          ],
          "offerType": "ONLINE_AND_STORE",
          "isTwoDayShippingEligible": true,
          "availableOnline": true
      },
      {
        "itemId": 14869675,
        "parentItemId": 14869675,
        "name": "Oscar Mayer Real Bacon Bits 4.5 oz. Pouch",
        "msrp": 3.48,
        "salePrice": 2.98,
        "upc": "044700031407",
        "categoryPath": "Food/Condiments, Sauces & Spices/Salad Dressings",
        "longDescription": "&lt;ul&gt;&lt;li&gt;Fully Cooked&lt;/li&gt;&lt;li&gt;America's Favorite&lt;/li&gt;&lt;li&gt;Value Size&lt;/li&gt;&lt;/ul&gt;",
        "thumbnailImage": "https://i5.walmartimages.com/asr/a98eaf82-287c-4674-9511-790893601bff_1.c4105004ee071dadd4aaf2ddf554a420.jpeg?odnHeight=100&odnWidth=100&odnBg=FFFFFF",
        "mediumImage": "https://i5.walmartimages.com/asr/a98eaf82-287c-4674-9511-790893601bff_1.c4105004ee071dadd4aaf2ddf554a420.jpeg?odnHeight=180&odnWidth=180&odnBg=FFFFFF",
        "largeImage": "https://i5.walmartimages.com/asr/a98eaf82-287c-4674-9511-790893601bff_1.c4105004ee071dadd4aaf2ddf554a420.jpeg?odnHeight=450&odnWidth=450&odnBg=FFFFFF",
        "productTrackingUrl": "http://linksynergy.walmart.com/fs-bin/click?id=|LSNID|&offerid=223073.7200&type=14&catid=8&subid=0&hid=7200&tmpid=1082&RD_PARM1=https%253A%252F%252Fwww.walmart.com%252Fip%252FOscar-Mayer-Real-Bacon-Bits-4-5-oz-Pouch%252F14869675%253Faffp1%253DkvbuZXPc3N3bE003KuartHuz60EEPyKcpByLGQ7rDqk%2526affilsrc%253Dapi",
        "standardShipRate": 5.99,
        "marketplace": false,
        "modelNumber": "3140",
        "productUrl": "http://c.affil.walmart.com/t/api02?l=https%3A%2F%2Fwww.walmart.com%2Fip%2FOscar-Mayer-Real-Bacon-Bits-4-5-oz-Pouch%2F14869675%3Faffp1%3DkvbuZXPc3N3bE003KuartHuz60EEPyKcpByLGQ7rDqk%26affilsrc%3Dapi%26veh%3Daff%26wmlspartner%3Dreadonlyapi",
        "customerRating": "4.603",
        "numReviews": 73,
        "customerRatingImage": "http://i2.walmartimages.com/i/CustRating/4_6.gif",
        "categoryNode": "976759_976786_1001365",
        "bundle": false,
        "stock": "Available",
        "addToCartUrl": "http://c.affil.walmart.com/t/api02?l=http%3A%2F%2Faffil.walmart.com%2Fcart%2FaddToCart%3Fitems%3D14869675%7C1%26affp1%3DkvbuZXPc3N3bE003KuartHuz60EEPyKcpByLGQ7rDqk%26affilsrc%3Dapi%26veh%3Daff%26wmlspartner%3Dreadonlyapi",
        "affiliateAddToCartUrl": "http://linksynergy.walmart.com/fs-bin/click?id=|LSNID|&offerid=223073.7200&type=14&catid=8&subid=0&hid=7200&tmpid=1082&RD_PARM1=http%253A%252F%252Faffil.walmart.com%252Fcart%252FaddToCart%253Fitems%253D14869675%257C1%2526affp1%253DkvbuZXPc3N3bE003KuartHuz60EEPyKcpByLGQ7rDqk%2526affilsrc%253Dapi",
        "imageEntities": [
            {
                "thumbnailImage": "https://i5.walmartimages.com/asr/613e85f1-f251-41b4-b7af-d87bd34f647b_1.2634357f784d710b8ce6e687dbfd8825.jpeg?odnHeight=100&odnWidth=100&odnBg=FFFFFF",
                "mediumImage": "https://i5.walmartimages.com/asr/613e85f1-f251-41b4-b7af-d87bd34f647b_1.2634357f784d710b8ce6e687dbfd8825.jpeg?odnHeight=180&odnWidth=180&odnBg=FFFFFF",
                "largeImage": "https://i5.walmartimages.com/asr/613e85f1-f251-41b4-b7af-d87bd34f647b_1.2634357f784d710b8ce6e687dbfd8825.jpeg?odnHeight=450&odnWidth=450&odnBg=FFFFFF",
                "entityType": "SECONDARY"
            },
            {
                "thumbnailImage": "https://i5.walmartimages.com/asr/ee35dbb3-407b-4972-9010-fd9b8720e01e_1.b7e1c3f65823ba0484d615677d5f5baa.jpeg?odnHeight=100&odnWidth=100&odnBg=FFFFFF",
                "mediumImage": "https://i5.walmartimages.com/asr/ee35dbb3-407b-4972-9010-fd9b8720e01e_1.b7e1c3f65823ba0484d615677d5f5baa.jpeg?odnHeight=180&odnWidth=180&odnBg=FFFFFF",
                "largeImage": "https://i5.walmartimages.com/asr/ee35dbb3-407b-4972-9010-fd9b8720e01e_1.b7e1c3f65823ba0484d615677d5f5baa.jpeg?odnHeight=450&odnWidth=450&odnBg=FFFFFF",
                "entityType": "SECONDARY"
            },
            {
                "thumbnailImage": "https://i5.walmartimages.com/asr/7ad758cd-2432-4607-96ff-573a30cbfb74_1.a083f35ea0033f3cac015d65b094c9a4.jpeg?odnHeight=100&odnWidth=100&odnBg=FFFFFF",
                "mediumImage": "https://i5.walmartimages.com/asr/7ad758cd-2432-4607-96ff-573a30cbfb74_1.a083f35ea0033f3cac015d65b094c9a4.jpeg?odnHeight=180&odnWidth=180&odnBg=FFFFFF",
                "largeImage": "https://i5.walmartimages.com/asr/7ad758cd-2432-4607-96ff-573a30cbfb74_1.a083f35ea0033f3cac015d65b094c9a4.jpeg?odnHeight=450&odnWidth=450&odnBg=FFFFFF",
                "entityType": "SECONDARY"
            },
            {
                "thumbnailImage": "https://i5.walmartimages.com/asr/1a88fc05-ac09-4d6a-b25e-9bfbcb02dbc2_1.f5fe6b6f285fd5b8830a219dd63bcf70.jpeg?odnHeight=100&odnWidth=100&odnBg=FFFFFF",
                "mediumImage": "https://i5.walmartimages.com/asr/1a88fc05-ac09-4d6a-b25e-9bfbcb02dbc2_1.f5fe6b6f285fd5b8830a219dd63bcf70.jpeg?odnHeight=180&odnWidth=180&odnBg=FFFFFF",
                "largeImage": "https://i5.walmartimages.com/asr/1a88fc05-ac09-4d6a-b25e-9bfbcb02dbc2_1.f5fe6b6f285fd5b8830a219dd63bcf70.jpeg?odnHeight=450&odnWidth=450&odnBg=FFFFFF",
                "entityType": "SECONDARY"
            },
            {
                "thumbnailImage": "https://i5.walmartimages.com/asr/6a7a41f1-bad0-4828-ba9b-9bdeb649471a_1.9c5bd39a4141b5bd2bd700a7ee934cb7.jpeg?odnHeight=100&odnWidth=100&odnBg=FFFFFF",
                "mediumImage": "https://i5.walmartimages.com/asr/6a7a41f1-bad0-4828-ba9b-9bdeb649471a_1.9c5bd39a4141b5bd2bd700a7ee934cb7.jpeg?odnHeight=180&odnWidth=180&odnBg=FFFFFF",
                "largeImage": "https://i5.walmartimages.com/asr/6a7a41f1-bad0-4828-ba9b-9bdeb649471a_1.9c5bd39a4141b5bd2bd700a7ee934cb7.jpeg?odnHeight=450&odnWidth=450&odnBg=FFFFFF",
                "entityType": "SECONDARY"
            },
            {
                "thumbnailImage": "https://i5.walmartimages.com/asr/a98eaf82-287c-4674-9511-790893601bff_1.c4105004ee071dadd4aaf2ddf554a420.jpeg?odnHeight=100&odnWidth=100&odnBg=FFFFFF",
                "mediumImage": "https://i5.walmartimages.com/asr/a98eaf82-287c-4674-9511-790893601bff_1.c4105004ee071dadd4aaf2ddf554a420.jpeg?odnHeight=180&odnWidth=180&odnBg=FFFFFF",
                "largeImage": "https://i5.walmartimages.com/asr/a98eaf82-287c-4674-9511-790893601bff_1.c4105004ee071dadd4aaf2ddf554a420.jpeg?odnHeight=450&odnWidth=450&odnBg=FFFFFF",
                "entityType": "PRIMARY"
            }
        ],
        "offerType": "ONLINE_AND_STORE",
        "isTwoDayShippingEligible": true,
        "availableOnline": true
      },
      {
        "itemId": 40547611,
        "parentItemId": 40547611,
        "name": "Oscar Mayer Real Bacon Bits 9 oz. Pouch",
        "salePrice": 5.98,
        "upc": "044700074817",
        "categoryPath": "Food/Condiments, Sauces & Spices/Salad Dressings",
        "longDescription": "&lt;ul&gt;&lt;li&gt;Fully Cooked&lt;/li&gt;&lt;li&gt;America's Favorite&lt;/li&gt;&lt;li&gt;9 oz. Mega Pack&lt;/li&gt;&lt;/ul&gt;",
        "thumbnailImage": "https://i5.walmartimages.com/asr/8a6e829d-286a-4164-8562-c0b4bfc88acb_1.e89e1e889d2ea9010962b6d79dc1fbc6.jpeg?odnHeight=100&odnWidth=100&odnBg=FFFFFF",
        "mediumImage": "https://i5.walmartimages.com/asr/8a6e829d-286a-4164-8562-c0b4bfc88acb_1.e89e1e889d2ea9010962b6d79dc1fbc6.jpeg?odnHeight=180&odnWidth=180&odnBg=FFFFFF",
        "largeImage": "https://i5.walmartimages.com/asr/8a6e829d-286a-4164-8562-c0b4bfc88acb_1.e89e1e889d2ea9010962b6d79dc1fbc6.jpeg?odnHeight=450&odnWidth=450&odnBg=FFFFFF",
        "productTrackingUrl": "http://linksynergy.walmart.com/fs-bin/click?id=|LSNID|&offerid=223073.7200&type=14&catid=8&subid=0&hid=7200&tmpid=1082&RD_PARM1=https%253A%252F%252Fwww.walmart.com%252Fip%252FOscar-Mayer-Real-Bacon-Bits-9-oz-Pouch%252F40547611%253Faffp1%253DkvbuZXPc3N3bE003KuartHuz60EEPyKcpByLGQ7rDqk%2526affilsrc%253Dapi",
        "standardShipRate": 5.99,
        "marketplace": false,
        "modelNumber": "4470007481",
        "productUrl": "http://c.affil.walmart.com/t/api02?l=https%3A%2F%2Fwww.walmart.com%2Fip%2FOscar-Mayer-Real-Bacon-Bits-9-oz-Pouch%2F40547611%3Faffp1%3DkvbuZXPc3N3bE003KuartHuz60EEPyKcpByLGQ7rDqk%26affilsrc%3Dapi%26veh%3Daff%26wmlspartner%3Dreadonlyapi",
        "customerRating": "4.824",
        "numReviews": 34,
        "customerRatingImage": "http://i2.walmartimages.com/i/CustRating/4_8.gif",
        "categoryNode": "976759_976786_1001365",
        "bundle": false,
        "stock": "Available",
        "addToCartUrl": "http://c.affil.walmart.com/t/api02?l=http%3A%2F%2Faffil.walmart.com%2Fcart%2FaddToCart%3Fitems%3D40547611%7C1%26affp1%3DkvbuZXPc3N3bE003KuartHuz60EEPyKcpByLGQ7rDqk%26affilsrc%3Dapi%26veh%3Daff%26wmlspartner%3Dreadonlyapi",
        "affiliateAddToCartUrl": "http://linksynergy.walmart.com/fs-bin/click?id=|LSNID|&offerid=223073.7200&type=14&catid=8&subid=0&hid=7200&tmpid=1082&RD_PARM1=http%253A%252F%252Faffil.walmart.com%252Fcart%252FaddToCart%253Fitems%253D40547611%257C1%2526affp1%253DkvbuZXPc3N3bE003KuartHuz60EEPyKcpByLGQ7rDqk%2526affilsrc%253Dapi",
        "imageEntities": [
            {
                "thumbnailImage": "https://i5.walmartimages.com/asr/ff008076-8010-4a8a-b42a-3305e5fecde1_1.886214fdbe542d90275c088f52393bae.jpeg?odnHeight=100&odnWidth=100&odnBg=FFFFFF",
                "mediumImage": "https://i5.walmartimages.com/asr/ff008076-8010-4a8a-b42a-3305e5fecde1_1.886214fdbe542d90275c088f52393bae.jpeg?odnHeight=180&odnWidth=180&odnBg=FFFFFF",
                "largeImage": "https://i5.walmartimages.com/asr/ff008076-8010-4a8a-b42a-3305e5fecde1_1.886214fdbe542d90275c088f52393bae.jpeg?odnHeight=450&odnWidth=450&odnBg=FFFFFF",
                "entityType": "SECONDARY"
            },
            {
                "thumbnailImage": "https://i5.walmartimages.com/asr/efdfe7cc-9847-4742-85bf-0d62f4a2b8c4_1.0023c47c47515afe44b904ec357e17eb.jpeg?odnHeight=100&odnWidth=100&odnBg=FFFFFF",
                "mediumImage": "https://i5.walmartimages.com/asr/efdfe7cc-9847-4742-85bf-0d62f4a2b8c4_1.0023c47c47515afe44b904ec357e17eb.jpeg?odnHeight=180&odnWidth=180&odnBg=FFFFFF",
                "largeImage": "https://i5.walmartimages.com/asr/efdfe7cc-9847-4742-85bf-0d62f4a2b8c4_1.0023c47c47515afe44b904ec357e17eb.jpeg?odnHeight=450&odnWidth=450&odnBg=FFFFFF",
                "entityType": "SECONDARY"
            },
            {
                "thumbnailImage": "https://i5.walmartimages.com/asr/0083001f-a9dd-449a-9272-608781b7af6d_5.83867ded8195e13869e7f5b87cea3e1f.png?odnHeight=100&odnWidth=100&odnBg=FFFFFF",
                "mediumImage": "https://i5.walmartimages.com/asr/0083001f-a9dd-449a-9272-608781b7af6d_5.83867ded8195e13869e7f5b87cea3e1f.png?odnHeight=180&odnWidth=180&odnBg=FFFFFF",
                "largeImage": "https://i5.walmartimages.com/asr/0083001f-a9dd-449a-9272-608781b7af6d_5.83867ded8195e13869e7f5b87cea3e1f.png?odnHeight=450&odnWidth=450&odnBg=FFFFFF",
                "entityType": "SECONDARY"
            },
            {
                "thumbnailImage": "https://i5.walmartimages.com/asr/705a6a86-018b-4f2d-855b-9291f93db84a_5.f0b7d98ac7937409ff35ea451907c1fd.png?odnHeight=100&odnWidth=100&odnBg=FFFFFF",
                "mediumImage": "https://i5.walmartimages.com/asr/705a6a86-018b-4f2d-855b-9291f93db84a_5.f0b7d98ac7937409ff35ea451907c1fd.png?odnHeight=180&odnWidth=180&odnBg=FFFFFF",
                "largeImage": "https://i5.walmartimages.com/asr/705a6a86-018b-4f2d-855b-9291f93db84a_5.f0b7d98ac7937409ff35ea451907c1fd.png?odnHeight=450&odnWidth=450&odnBg=FFFFFF",
                "entityType": "SECONDARY"
            },
            {
                "thumbnailImage": "https://i5.walmartimages.com/asr/8a6e829d-286a-4164-8562-c0b4bfc88acb_1.e89e1e889d2ea9010962b6d79dc1fbc6.jpeg?odnHeight=100&odnWidth=100&odnBg=FFFFFF",
                "mediumImage": "https://i5.walmartimages.com/asr/8a6e829d-286a-4164-8562-c0b4bfc88acb_1.e89e1e889d2ea9010962b6d79dc1fbc6.jpeg?odnHeight=180&odnWidth=180&odnBg=FFFFFF",
                "largeImage": "https://i5.walmartimages.com/asr/8a6e829d-286a-4164-8562-c0b4bfc88acb_1.e89e1e889d2ea9010962b6d79dc1fbc6.jpeg?odnHeight=450&odnWidth=450&odnBg=FFFFFF",
                "entityType": "PRIMARY"
            }
        ],
        "offerType": "ONLINE_AND_STORE",
        "isTwoDayShippingEligible": true,
        "availableOnline": true
      },
      {
        "itemId": 13908489,
        "parentItemId": 13908489,
        "name": "McCormick® Bac'n Pieces™ Bacon Flavored Bits 4.4 oz. Shaker",
        "salePrice": 1.68,
        "upc": "052100010922",
        "categoryPath": "Food/Fresh Food/Meat, Seafood & Poultry/Bacon & Sausages",
        "longDescription": "&lt;ul&gt;&lt;li&gt;Bac'n Pieces, Bacon Flavored, Bits&lt;/li&gt;&lt;li&gt;The taste you trust. Artificially flavored. Great bacon flavor! For Recipes, Visit: www.mccormick.com. Questions? Call 1-800-632-5847. Packed in USA.&lt;/li&gt;&lt;/ul&gt;",
        "thumbnailImage": "https://i5.walmartimages.com/asr/783876be-3be4-4dfe-a996-519fa3beb0a9_1.2dd12e3f1a14182bfa259aa6c488782b.jpeg?odnHeight=100&odnWidth=100&odnBg=FFFFFF",
        "mediumImage": "https://i5.walmartimages.com/asr/783876be-3be4-4dfe-a996-519fa3beb0a9_1.2dd12e3f1a14182bfa259aa6c488782b.jpeg?odnHeight=180&odnWidth=180&odnBg=FFFFFF",
        "largeImage": "https://i5.walmartimages.com/asr/783876be-3be4-4dfe-a996-519fa3beb0a9_1.2dd12e3f1a14182bfa259aa6c488782b.jpeg?odnHeight=450&odnWidth=450&odnBg=FFFFFF",
        "productTrackingUrl": "http://linksynergy.walmart.com/fs-bin/click?id=|LSNID|&offerid=223073.7200&type=14&catid=8&subid=0&hid=7200&tmpid=1082&RD_PARM1=https%253A%252F%252Fwww.walmart.com%252Fip%252FMcCormick-Bac-n-Pieces-Bacon-Flavored-Bits-4-4-oz-Shaker%252F13908489%253Faffp1%253DkvbuZXPc3N3bE003KuartHuz60EEPyKcpByLGQ7rDqk%2526affilsrc%253Dapi",
        "standardShipRate": 5.99,
        "marketplace": false,
        "modelNumber": "900223519",
        "productUrl": "http://c.affil.walmart.com/t/api02?l=https%3A%2F%2Fwww.walmart.com%2Fip%2FMcCormick-Bac-n-Pieces-Bacon-Flavored-Bits-4-4-oz-Shaker%2F13908489%3Faffp1%3DkvbuZXPc3N3bE003KuartHuz60EEPyKcpByLGQ7rDqk%26affilsrc%3Dapi%26veh%3Daff%26wmlspartner%3Dreadonlyapi",
        "customerRating": "4.5",
        "numReviews": 2,
        "customerRatingImage": "http://i2.walmartimages.com/i/CustRating/4_5.gif",
        "categoryNode": "976759_1071964_976796",
        "bundle": false,
        "stock": "Available",
        "addToCartUrl": "http://c.affil.walmart.com/t/api02?l=http%3A%2F%2Faffil.walmart.com%2Fcart%2FaddToCart%3Fitems%3D13908489%7C1%26affp1%3DkvbuZXPc3N3bE003KuartHuz60EEPyKcpByLGQ7rDqk%26affilsrc%3Dapi%26veh%3Daff%26wmlspartner%3Dreadonlyapi",
        "affiliateAddToCartUrl": "http://linksynergy.walmart.com/fs-bin/click?id=|LSNID|&offerid=223073.7200&type=14&catid=8&subid=0&hid=7200&tmpid=1082&RD_PARM1=http%253A%252F%252Faffil.walmart.com%252Fcart%252FaddToCart%253Fitems%253D13908489%257C1%2526affp1%253DkvbuZXPc3N3bE003KuartHuz60EEPyKcpByLGQ7rDqk%2526affilsrc%253Dapi",
        "imageEntities": [
            {
                "thumbnailImage": "https://i5.walmartimages.com/asr/82c7982c-afa7-4640-8cd2-e2d35e1f8694_1.9167e3c00451a7cef30f57e3dbaa4e6d.jpeg?odnHeight=100&odnWidth=100&odnBg=FFFFFF",
                "mediumImage": "https://i5.walmartimages.com/asr/82c7982c-afa7-4640-8cd2-e2d35e1f8694_1.9167e3c00451a7cef30f57e3dbaa4e6d.jpeg?odnHeight=180&odnWidth=180&odnBg=FFFFFF",
                "largeImage": "https://i5.walmartimages.com/asr/82c7982c-afa7-4640-8cd2-e2d35e1f8694_1.9167e3c00451a7cef30f57e3dbaa4e6d.jpeg?odnHeight=450&odnWidth=450&odnBg=FFFFFF",
                "entityType": "SECONDARY"
            },
            {
                "thumbnailImage": "https://i5.walmartimages.com/asr/c2019ea6-6e56-4407-8559-a91140aa52c9_1.9c6aca63e919ef7e093f2193d9a5da35.jpeg?odnHeight=100&odnWidth=100&odnBg=FFFFFF",
                "mediumImage": "https://i5.walmartimages.com/asr/c2019ea6-6e56-4407-8559-a91140aa52c9_1.9c6aca63e919ef7e093f2193d9a5da35.jpeg?odnHeight=180&odnWidth=180&odnBg=FFFFFF",
                "largeImage": "https://i5.walmartimages.com/asr/c2019ea6-6e56-4407-8559-a91140aa52c9_1.9c6aca63e919ef7e093f2193d9a5da35.jpeg?odnHeight=450&odnWidth=450&odnBg=FFFFFF",
                "entityType": "SECONDARY"
            },
            {
                "thumbnailImage": "https://i5.walmartimages.com/asr/783876be-3be4-4dfe-a996-519fa3beb0a9_1.2dd12e3f1a14182bfa259aa6c488782b.jpeg?odnHeight=100&odnWidth=100&odnBg=FFFFFF",
                "mediumImage": "https://i5.walmartimages.com/asr/783876be-3be4-4dfe-a996-519fa3beb0a9_1.2dd12e3f1a14182bfa259aa6c488782b.jpeg?odnHeight=180&odnWidth=180&odnBg=FFFFFF",
                "largeImage": "https://i5.walmartimages.com/asr/783876be-3be4-4dfe-a996-519fa3beb0a9_1.2dd12e3f1a14182bfa259aa6c488782b.jpeg?odnHeight=450&odnWidth=450&odnBg=FFFFFF",
                "entityType": "PRIMARY"
            }
        ],
        "offerType": "ONLINE_AND_STORE",
        "isTwoDayShippingEligible": true,
        "availableOnline": true
      },
      {
        "itemId": 105125834,
        "parentItemId": 105125834,
        "name": "BaconBoss Microwave Bacon Cooker for Healthier, Crispy Bacon",
        "salePrice": 14.97,
        "upc": "740275046760",
        "categoryPath": "Food/Fresh Food/Meat, Seafood & Poultry/Bacon & Sausages",
        "shortDescription": "About the ProductEasy to use microwave bacon tray makes frying bacon fast and tastyTempered glass lid bacon press helps keep bacon flat for less shrinkage and more even cookingBaconBoss bacon pan traps and recirculates heat for faster-cooking baconMicrowave bacon without the mess; less grease and fat mean healthier, crispier baconEliminate stuck-on bacon grease; the BaconBoss is dishwasher safe and easy to clean",
        "longDescription": "Now microwave bacon can be made healthier, crispier and tastier. The BaconBoss bacon press lets you flatten and fry bacon right from your microwave. Extra grease and fat drain out effortlessly while savory bacon flavor is locked in thanks to the power of recirculating heat. The end result is crispy, perfectly cooked bacon that completes any meal. Dishwasher-safe bacon rack makes enjoying everyone&rsquo;s favorite side dish a treat - not a chore.",
        "thumbnailImage": "https://i5.walmartimages.com/asr/a8a41377-5f22-4274-9ed0-93835f175c89_1.35bfe56eda9b5be5206f943925cdbd1d.jpeg?odnHeight=100&odnWidth=100&odnBg=FFFFFF",
        "mediumImage": "https://i5.walmartimages.com/asr/a8a41377-5f22-4274-9ed0-93835f175c89_1.35bfe56eda9b5be5206f943925cdbd1d.jpeg?odnHeight=180&odnWidth=180&odnBg=FFFFFF",
        "largeImage": "https://i5.walmartimages.com/asr/a8a41377-5f22-4274-9ed0-93835f175c89_1.35bfe56eda9b5be5206f943925cdbd1d.jpeg?odnHeight=450&odnWidth=450&odnBg=FFFFFF",
        "productTrackingUrl": "http://linksynergy.walmart.com/fs-bin/click?id=|LSNID|&offerid=223073.7200&type=14&catid=8&subid=0&hid=7200&tmpid=1082&RD_PARM1=https%253A%252F%252Fwww.walmart.com%252Fip%252FBaconBoss-Microwave-Bacon-Cooker-for-Healthier-Crispy-Bacon%252F105125834%253Faffp1%253DkvbuZXPc3N3bE003KuartHuz60EEPyKcpByLGQ7rDqk%2526affilsrc%253Dapi",
        "standardShipRate": 0,
        "marketplace": true,
        "sellerInfo": "Best Deals",
        "productUrl": "http://c.affil.walmart.com/t/api02?l=https%3A%2F%2Fwww.walmart.com%2Fip%2FBaconBoss-Microwave-Bacon-Cooker-for-Healthier-Crispy-Bacon%2F105125834%3Faffp1%3DkvbuZXPc3N3bE003KuartHuz60EEPyKcpByLGQ7rDqk%26affilsrc%3Dapi%26veh%3Daff%26wmlspartner%3Dreadonlyapi",
        "customerRating": "1.0",
        "numReviews": 1,
        "customerRatingImage": "http://i2.walmartimages.com/i/CustRating/1.gif",
        "categoryNode": "976759_1071964_976796",
        "bundle": false,
        "stock": "Available",
        "addToCartUrl": "http://c.affil.walmart.com/t/api02?l=http%3A%2F%2Faffil.walmart.com%2Fcart%2FaddToCart%3Fitems%3D105125834%7C1%26affp1%3DkvbuZXPc3N3bE003KuartHuz60EEPyKcpByLGQ7rDqk%26affilsrc%3Dapi%26veh%3Daff%26wmlspartner%3Dreadonlyapi",
        "affiliateAddToCartUrl": "http://linksynergy.walmart.com/fs-bin/click?id=|LSNID|&offerid=223073.7200&type=14&catid=8&subid=0&hid=7200&tmpid=1082&RD_PARM1=http%253A%252F%252Faffil.walmart.com%252Fcart%252FaddToCart%253Fitems%253D105125834%257C1%2526affp1%253DkvbuZXPc3N3bE003KuartHuz60EEPyKcpByLGQ7rDqk%2526affilsrc%253Dapi",
        "freeShippingOver50Dollars": false,
        "imageEntities": [
            {
                "thumbnailImage": "https://i5.walmartimages.com/asr/a8a41377-5f22-4274-9ed0-93835f175c89_1.35bfe56eda9b5be5206f943925cdbd1d.jpeg?odnHeight=100&odnWidth=100&odnBg=FFFFFF",
                "mediumImage": "https://i5.walmartimages.com/asr/a8a41377-5f22-4274-9ed0-93835f175c89_1.35bfe56eda9b5be5206f943925cdbd1d.jpeg?odnHeight=180&odnWidth=180&odnBg=FFFFFF",
                "largeImage": "https://i5.walmartimages.com/asr/a8a41377-5f22-4274-9ed0-93835f175c89_1.35bfe56eda9b5be5206f943925cdbd1d.jpeg?odnHeight=450&odnWidth=450&odnBg=FFFFFF",
                "entityType": "PRIMARY"
            }
        ],
        "offerType": "ONLINE_ONLY",
        "availableOnline": true
      },
    ]
  },
  {
    name: 'Cheese',
    items: [
        {
            "itemId": 10295586,
            "parentItemId": 10295586,
            "name": "Kraft Velveeta Cheese, 16 oz",
            "salePrice": 4.98,
            "upc": "021000616893",
            "categoryPath": "Food/Fresh Food/Dairy, Eggs & Cheese/Cheese",
            "shortDescription": "&lt;p&gt;Kraft Velveeta Cheese is a classic that kids and adults both love. Kraft Cheese has less fat than cheddar and has many great uses in the kitchen. Kraft Velveeta Cheese also melts well to create great-tasting dips, sauces and much more.&lt;/p&gt;",
            "longDescription": "&lt;p&gt;&lt;b&gt;Kraft Velveeta: Cheese , 16 Oz:&lt;/b&gt;&lt;/p&gt;&lt;ul&gt;&lt;li&gt;Melts better&lt;/li&gt;&lt;li&gt;1/3 less fat than cheddar&lt;/li&gt;&lt;/ul&gt;&lt;p&gt;Kraft Velveeta Cheese is a classic that kids and adults both love. Kraft Cheese has less fat than cheddar and has many great uses in the kitchen. Kraft Velveeta Cheese also melts well to create great-tasting dips, sauces and much more.&lt;/p&gt;",
            "thumbnailImage": "https://i5.walmartimages.com/asr/acdff4b3-b569-45e1-9442-066acb0948a6_1.87edf9be71afb6b0e17ef94ae930c806.jpeg?odnHeight=100&odnWidth=100&odnBg=FFFFFF",
            "mediumImage": "https://i5.walmartimages.com/asr/acdff4b3-b569-45e1-9442-066acb0948a6_1.87edf9be71afb6b0e17ef94ae930c806.jpeg?odnHeight=180&odnWidth=180&odnBg=FFFFFF",
            "largeImage": "https://i5.walmartimages.com/asr/acdff4b3-b569-45e1-9442-066acb0948a6_1.87edf9be71afb6b0e17ef94ae930c806.jpeg?odnHeight=450&odnWidth=450&odnBg=FFFFFF",
            "productTrackingUrl": "http://linksynergy.walmart.com/fs-bin/click?id=|LSNID|&offerid=223073.7200&type=14&catid=8&subid=0&hid=7200&tmpid=1082&RD_PARM1=https%253A%252F%252Fwww.walmart.com%252Fip%252FKraft-Velveeta-Cheese-16-oz%252F10295586%253Faffp1%253DkvbuZXPc3N3bE003KuartHuz60EEPyKcpByLGQ7rDqk%2526affilsrc%253Dapi",
            "standardShipRate": 5.99,
            "marketplace": false,
            "modelNumber": "30243",
            "productUrl": "http://c.affil.walmart.com/t/api02?l=https%3A%2F%2Fwww.walmart.com%2Fip%2FKraft-Velveeta-Cheese-16-oz%2F10295586%3Faffp1%3DkvbuZXPc3N3bE003KuartHuz60EEPyKcpByLGQ7rDqk%26affilsrc%3Dapi%26veh%3Daff%26wmlspartner%3Dreadonlyapi",
            "customerRating": "4.491",
            "numReviews": 55,
            "customerRatingImage": "http://i2.walmartimages.com/i/CustRating/4_5.gif",
            "categoryNode": "976759_1071964_976788",
            "bundle": false,
            "stock": "Available",
            "addToCartUrl": "http://c.affil.walmart.com/t/api02?l=http%3A%2F%2Faffil.walmart.com%2Fcart%2FaddToCart%3Fitems%3D10295586%7C1%26affp1%3DkvbuZXPc3N3bE003KuartHuz60EEPyKcpByLGQ7rDqk%26affilsrc%3Dapi%26veh%3Daff%26wmlspartner%3Dreadonlyapi",
            "affiliateAddToCartUrl": "http://linksynergy.walmart.com/fs-bin/click?id=|LSNID|&offerid=223073.7200&type=14&catid=8&subid=0&hid=7200&tmpid=1082&RD_PARM1=http%253A%252F%252Faffil.walmart.com%252Fcart%252FaddToCart%253Fitems%253D10295586%257C1%2526affp1%253DkvbuZXPc3N3bE003KuartHuz60EEPyKcpByLGQ7rDqk%2526affilsrc%253Dapi",
            "imageEntities": [
                {
                    "thumbnailImage": "https://i5.walmartimages.com/asr/5ac7e36c-370d-4f09-9e00-3104e6981cef_1.0dccd5221f9b395464e103271e045228.jpeg?odnHeight=100&odnWidth=100&odnBg=FFFFFF",
                    "mediumImage": "https://i5.walmartimages.com/asr/5ac7e36c-370d-4f09-9e00-3104e6981cef_1.0dccd5221f9b395464e103271e045228.jpeg?odnHeight=180&odnWidth=180&odnBg=FFFFFF",
                    "largeImage": "https://i5.walmartimages.com/asr/5ac7e36c-370d-4f09-9e00-3104e6981cef_1.0dccd5221f9b395464e103271e045228.jpeg?odnHeight=450&odnWidth=450&odnBg=FFFFFF",
                    "entityType": "SECONDARY"
                },
                {
                    "thumbnailImage": "https://i5.walmartimages.com/asr/acdff4b3-b569-45e1-9442-066acb0948a6_1.87edf9be71afb6b0e17ef94ae930c806.jpeg?odnHeight=100&odnWidth=100&odnBg=FFFFFF",
                    "mediumImage": "https://i5.walmartimages.com/asr/acdff4b3-b569-45e1-9442-066acb0948a6_1.87edf9be71afb6b0e17ef94ae930c806.jpeg?odnHeight=180&odnWidth=180&odnBg=FFFFFF",
                    "largeImage": "https://i5.walmartimages.com/asr/acdff4b3-b569-45e1-9442-066acb0948a6_1.87edf9be71afb6b0e17ef94ae930c806.jpeg?odnHeight=450&odnWidth=450&odnBg=FFFFFF",
                    "entityType": "PRIMARY"
                }
            ],
            "offerType": "ONLINE_AND_STORE",
            "isTwoDayShippingEligible": true,
            "availableOnline": true
        },
        {
            "itemId": 10315402,
            "parentItemId": 10315402,
            "name": "Great Value Shaker Grated Parm 8 Oz",
            "salePrice": 3.18,
            "upc": "078742353227",
            "categoryPath": "Food/Fresh Food/Dairy, Eggs & Cheese/Cheese",
            "shortDescription": "Keep some Great Value Parmesan Cheese handy to add flavor to your recipes. It comes in an easy shake jar so you can conveniently add it to your favorite pastas, soups and other foods. This 100 percent Parmesan grated cheese makes for a wonderful addition to your cooking supplies.",
            "longDescription": "&lt;b&gt;Great Value: 100% Parmesan Grated Cheese, 8 oz:&lt;/b&gt;&lt;br&gt;&lt;ul&gt;&lt;li&gt;Grated cheese&lt;/li&gt;&lt;li&gt;Great Value cheese, 8 oz&lt;/li&gt;&lt;/ul&gt;&lt;br&gt;Keep some Great Value Parmesan Cheese handy to add flavor to your recipes. It comes in an easy shake jar so you can conveniently add it to your favorite pastas, soups and other foods. This 100 percent Parmesan grated cheese makes for a wonderful addition to your cooking supplies.",
            "thumbnailImage": "https://i5.walmartimages.com/asr/3e44330e-2c89-4630-b47a-63b63a77a8df_1.cc3747bcc574177429f3ca7c7c6c6521.jpeg?odnHeight=100&odnWidth=100&odnBg=FFFFFF",
            "mediumImage": "https://i5.walmartimages.com/asr/3e44330e-2c89-4630-b47a-63b63a77a8df_1.cc3747bcc574177429f3ca7c7c6c6521.jpeg?odnHeight=180&odnWidth=180&odnBg=FFFFFF",
            "largeImage": "https://i5.walmartimages.com/asr/3e44330e-2c89-4630-b47a-63b63a77a8df_1.cc3747bcc574177429f3ca7c7c6c6521.jpeg?odnHeight=450&odnWidth=450&odnBg=FFFFFF",
            "productTrackingUrl": "http://linksynergy.walmart.com/fs-bin/click?id=|LSNID|&offerid=223073.7200&type=14&catid=8&subid=0&hid=7200&tmpid=1082&RD_PARM1=https%253A%252F%252Fwww.walmart.com%252Fip%252FGreat-Value-Shaker-Grated-Parm-8-Oz%252F10315402%253Faffp1%253DkvbuZXPc3N3bE003KuartHuz60EEPyKcpByLGQ7rDqk%2526affilsrc%253Dapi",
            "standardShipRate": 5.99,
            "marketplace": false,
            "modelNumber": "35322",
            "productUrl": "http://c.affil.walmart.com/t/api02?l=https%3A%2F%2Fwww.walmart.com%2Fip%2FGreat-Value-Shaker-Grated-Parm-8-Oz%2F10315402%3Faffp1%3DkvbuZXPc3N3bE003KuartHuz60EEPyKcpByLGQ7rDqk%26affilsrc%3Dapi%26veh%3Daff%26wmlspartner%3Dreadonlyapi",
            "customerRating": "4.579",
            "numReviews": 126,
            "customerRatingImage": "http://i2.walmartimages.com/i/CustRating/4_6.gif",
            "categoryNode": "976759_1071964_976788",
            "bundle": false,
            "stock": "Available",
            "addToCartUrl": "http://c.affil.walmart.com/t/api02?l=http%3A%2F%2Faffil.walmart.com%2Fcart%2FaddToCart%3Fitems%3D10315402%7C1%26affp1%3DkvbuZXPc3N3bE003KuartHuz60EEPyKcpByLGQ7rDqk%26affilsrc%3Dapi%26veh%3Daff%26wmlspartner%3Dreadonlyapi",
            "affiliateAddToCartUrl": "http://linksynergy.walmart.com/fs-bin/click?id=|LSNID|&offerid=223073.7200&type=14&catid=8&subid=0&hid=7200&tmpid=1082&RD_PARM1=http%253A%252F%252Faffil.walmart.com%252Fcart%252FaddToCart%253Fitems%253D10315402%257C1%2526affp1%253DkvbuZXPc3N3bE003KuartHuz60EEPyKcpByLGQ7rDqk%2526affilsrc%253Dapi",
            "imageEntities": [
                {
                    "thumbnailImage": "https://i5.walmartimages.com/asr/164a86ba-e0fd-4ac1-be09-be8964ee1474_1.d2e2de118cac8db0e14fc1d4979e4bcb.jpeg?odnHeight=100&odnWidth=100&odnBg=FFFFFF",
                    "mediumImage": "https://i5.walmartimages.com/asr/164a86ba-e0fd-4ac1-be09-be8964ee1474_1.d2e2de118cac8db0e14fc1d4979e4bcb.jpeg?odnHeight=180&odnWidth=180&odnBg=FFFFFF",
                    "largeImage": "https://i5.walmartimages.com/asr/164a86ba-e0fd-4ac1-be09-be8964ee1474_1.d2e2de118cac8db0e14fc1d4979e4bcb.jpeg?odnHeight=450&odnWidth=450&odnBg=FFFFFF",
                    "entityType": "SECONDARY"
                },
                {
                    "thumbnailImage": "https://i5.walmartimages.com/asr/b311a0a4-5bbb-4dae-8cad-6905a008a25e_1.bb24672cfa3831de8ede143e9f930147.jpeg?odnHeight=100&odnWidth=100&odnBg=FFFFFF",
                    "mediumImage": "https://i5.walmartimages.com/asr/b311a0a4-5bbb-4dae-8cad-6905a008a25e_1.bb24672cfa3831de8ede143e9f930147.jpeg?odnHeight=180&odnWidth=180&odnBg=FFFFFF",
                    "largeImage": "https://i5.walmartimages.com/asr/b311a0a4-5bbb-4dae-8cad-6905a008a25e_1.bb24672cfa3831de8ede143e9f930147.jpeg?odnHeight=450&odnWidth=450&odnBg=FFFFFF",
                    "entityType": "SECONDARY"
                },
                {
                    "thumbnailImage": "https://i5.walmartimages.com/asr/3dd3b255-b82d-4eb0-a01b-df1994a1f98d_1.cd941bbe32399fdbb8e2453b2a1e89ce.jpeg?odnHeight=100&odnWidth=100&odnBg=FFFFFF",
                    "mediumImage": "https://i5.walmartimages.com/asr/3dd3b255-b82d-4eb0-a01b-df1994a1f98d_1.cd941bbe32399fdbb8e2453b2a1e89ce.jpeg?odnHeight=180&odnWidth=180&odnBg=FFFFFF",
                    "largeImage": "https://i5.walmartimages.com/asr/3dd3b255-b82d-4eb0-a01b-df1994a1f98d_1.cd941bbe32399fdbb8e2453b2a1e89ce.jpeg?odnHeight=450&odnWidth=450&odnBg=FFFFFF",
                    "entityType": "SECONDARY"
                },
                {
                    "thumbnailImage": "https://i5.walmartimages.com/asr/bd9a406f-cd98-461f-a5dd-6bafb2a4b025_1.0a071f4fd3b67e63a7e634c78cd4ae21.jpeg?odnHeight=100&odnWidth=100&odnBg=FFFFFF",
                    "mediumImage": "https://i5.walmartimages.com/asr/bd9a406f-cd98-461f-a5dd-6bafb2a4b025_1.0a071f4fd3b67e63a7e634c78cd4ae21.jpeg?odnHeight=180&odnWidth=180&odnBg=FFFFFF",
                    "largeImage": "https://i5.walmartimages.com/asr/bd9a406f-cd98-461f-a5dd-6bafb2a4b025_1.0a071f4fd3b67e63a7e634c78cd4ae21.jpeg?odnHeight=450&odnWidth=450&odnBg=FFFFFF",
                    "entityType": "SECONDARY"
                },
                {
                    "thumbnailImage": "https://i5.walmartimages.com/asr/3e44330e-2c89-4630-b47a-63b63a77a8df_1.cc3747bcc574177429f3ca7c7c6c6521.jpeg?odnHeight=100&odnWidth=100&odnBg=FFFFFF",
                    "mediumImage": "https://i5.walmartimages.com/asr/3e44330e-2c89-4630-b47a-63b63a77a8df_1.cc3747bcc574177429f3ca7c7c6c6521.jpeg?odnHeight=180&odnWidth=180&odnBg=FFFFFF",
                    "largeImage": "https://i5.walmartimages.com/asr/3e44330e-2c89-4630-b47a-63b63a77a8df_1.cc3747bcc574177429f3ca7c7c6c6521.jpeg?odnHeight=450&odnWidth=450&odnBg=FFFFFF",
                    "entityType": "PRIMARY"
                }
            ],
            "offerType": "ONLINE_AND_STORE",
            "isTwoDayShippingEligible": true,
            "availableOnline": true
        },
        {
            "itemId": 10295582,
            "parentItemId": 10295582,
            "name": "Kraft Grated Cheese Cheese 100% Real Parmesan & Romano, 8 oz",
            "salePrice": 3.97,
            "upc": "021000615414",
            "categoryPath": "Food/Fresh Food/Dairy, Eggs & Cheese/Cheese",
            "shortDescription": "&lt;br&gt;",
            "longDescription": "&lt;p&gt;This Kraft Grated Cheese: Cheese 100% Real Parmesan &amp; Romano has bold and delicious flavors. With no fillers, this cheese can be used for extra flavor in almost any recipe. This Grated Romano cheese, 8 oz, comes in an easy-to-use shaker.&lt;/p&gt;&lt;br&gt;",
            "thumbnailImage": "https://i5.walmartimages.com/asr/c009a507-ff7f-4e30-ba1e-16679ff0eafa_1.0bf5fc4eb1cac34d7a46f57a9b571464.jpeg?odnHeight=100&odnWidth=100&odnBg=FFFFFF",
            "mediumImage": "https://i5.walmartimages.com/asr/c009a507-ff7f-4e30-ba1e-16679ff0eafa_1.0bf5fc4eb1cac34d7a46f57a9b571464.jpeg?odnHeight=180&odnWidth=180&odnBg=FFFFFF",
            "largeImage": "https://i5.walmartimages.com/asr/c009a507-ff7f-4e30-ba1e-16679ff0eafa_1.0bf5fc4eb1cac34d7a46f57a9b571464.jpeg?odnHeight=450&odnWidth=450&odnBg=FFFFFF",
            "productTrackingUrl": "http://linksynergy.walmart.com/fs-bin/click?id=|LSNID|&offerid=223073.7200&type=14&catid=8&subid=0&hid=7200&tmpid=1082&RD_PARM1=https%253A%252F%252Fwww.walmart.com%252Fip%252FKraft-Grated-Cheese-Cheese-100-Real-Parmesan-Romano-8-oz%252F10295582%253Faffp1%253DkvbuZXPc3N3bE003KuartHuz60EEPyKcpByLGQ7rDqk%2526affilsrc%253Dapi",
            "standardShipRate": 5.99,
            "marketplace": false,
            "modelNumber": "72392-00721",
            "productUrl": "http://c.affil.walmart.com/t/api02?l=https%3A%2F%2Fwww.walmart.com%2Fip%2FKraft-Grated-Cheese-Cheese-100-Real-Parmesan-Romano-8-oz%2F10295582%3Faffp1%3DkvbuZXPc3N3bE003KuartHuz60EEPyKcpByLGQ7rDqk%26affilsrc%3Dapi%26veh%3Daff%26wmlspartner%3Dreadonlyapi",
            "customerRating": "4.714",
            "numReviews": 49,
            "customerRatingImage": "http://i2.walmartimages.com/i/CustRating/4_7.gif",
            "categoryNode": "976759_1071964_976788",
            "bundle": false,
            "stock": "Available",
            "addToCartUrl": "http://c.affil.walmart.com/t/api02?l=http%3A%2F%2Faffil.walmart.com%2Fcart%2FaddToCart%3Fitems%3D10295582%7C1%26affp1%3DkvbuZXPc3N3bE003KuartHuz60EEPyKcpByLGQ7rDqk%26affilsrc%3Dapi%26veh%3Daff%26wmlspartner%3Dreadonlyapi",
            "affiliateAddToCartUrl": "http://linksynergy.walmart.com/fs-bin/click?id=|LSNID|&offerid=223073.7200&type=14&catid=8&subid=0&hid=7200&tmpid=1082&RD_PARM1=http%253A%252F%252Faffil.walmart.com%252Fcart%252FaddToCart%253Fitems%253D10295582%257C1%2526affp1%253DkvbuZXPc3N3bE003KuartHuz60EEPyKcpByLGQ7rDqk%2526affilsrc%253Dapi",
            "imageEntities": [
                {
                    "thumbnailImage": "https://i5.walmartimages.com/asr/6cd856a4-5d3e-4009-b6e1-ed3959e3943b_1.051a962c10b348ea5641566298e36cf8.jpeg?odnHeight=100&odnWidth=100&odnBg=FFFFFF",
                    "mediumImage": "https://i5.walmartimages.com/asr/6cd856a4-5d3e-4009-b6e1-ed3959e3943b_1.051a962c10b348ea5641566298e36cf8.jpeg?odnHeight=180&odnWidth=180&odnBg=FFFFFF",
                    "largeImage": "https://i5.walmartimages.com/asr/6cd856a4-5d3e-4009-b6e1-ed3959e3943b_1.051a962c10b348ea5641566298e36cf8.jpeg?odnHeight=450&odnWidth=450&odnBg=FFFFFF",
                    "entityType": "SECONDARY"
                },
                {
                    "thumbnailImage": "https://i5.walmartimages.com/asr/90619873-c406-46e5-bf61-f57609956b7e_1.0f515b5563983e4f810e1fe4bf4cb8ea.jpeg?odnHeight=100&odnWidth=100&odnBg=FFFFFF",
                    "mediumImage": "https://i5.walmartimages.com/asr/90619873-c406-46e5-bf61-f57609956b7e_1.0f515b5563983e4f810e1fe4bf4cb8ea.jpeg?odnHeight=180&odnWidth=180&odnBg=FFFFFF",
                    "largeImage": "https://i5.walmartimages.com/asr/90619873-c406-46e5-bf61-f57609956b7e_1.0f515b5563983e4f810e1fe4bf4cb8ea.jpeg?odnHeight=450&odnWidth=450&odnBg=FFFFFF",
                    "entityType": "SECONDARY"
                },
                {
                    "thumbnailImage": "https://i5.walmartimages.com/asr/5c7637f8-e90e-409c-8582-8bb3babf9f9a_1.f545017adb34f56935d8c8ea19a01f05.jpeg?odnHeight=100&odnWidth=100&odnBg=FFFFFF",
                    "mediumImage": "https://i5.walmartimages.com/asr/5c7637f8-e90e-409c-8582-8bb3babf9f9a_1.f545017adb34f56935d8c8ea19a01f05.jpeg?odnHeight=180&odnWidth=180&odnBg=FFFFFF",
                    "largeImage": "https://i5.walmartimages.com/asr/5c7637f8-e90e-409c-8582-8bb3babf9f9a_1.f545017adb34f56935d8c8ea19a01f05.jpeg?odnHeight=450&odnWidth=450&odnBg=FFFFFF",
                    "entityType": "SECONDARY"
                },
                {
                    "thumbnailImage": "https://i5.walmartimages.com/asr/525695c4-c5bc-4847-b47f-dedaec239b8d_1.6edee2b64ed28a507c1ebbbd118031bd.jpeg?odnHeight=100&odnWidth=100&odnBg=FFFFFF",
                    "mediumImage": "https://i5.walmartimages.com/asr/525695c4-c5bc-4847-b47f-dedaec239b8d_1.6edee2b64ed28a507c1ebbbd118031bd.jpeg?odnHeight=180&odnWidth=180&odnBg=FFFFFF",
                    "largeImage": "https://i5.walmartimages.com/asr/525695c4-c5bc-4847-b47f-dedaec239b8d_1.6edee2b64ed28a507c1ebbbd118031bd.jpeg?odnHeight=450&odnWidth=450&odnBg=FFFFFF",
                    "entityType": "SECONDARY"
                },
                {
                    "thumbnailImage": "https://i5.walmartimages.com/asr/c009a507-ff7f-4e30-ba1e-16679ff0eafa_1.0bf5fc4eb1cac34d7a46f57a9b571464.jpeg?odnHeight=100&odnWidth=100&odnBg=FFFFFF",
                    "mediumImage": "https://i5.walmartimages.com/asr/c009a507-ff7f-4e30-ba1e-16679ff0eafa_1.0bf5fc4eb1cac34d7a46f57a9b571464.jpeg?odnHeight=180&odnWidth=180&odnBg=FFFFFF",
                    "largeImage": "https://i5.walmartimages.com/asr/c009a507-ff7f-4e30-ba1e-16679ff0eafa_1.0bf5fc4eb1cac34d7a46f57a9b571464.jpeg?odnHeight=450&odnWidth=450&odnBg=FFFFFF",
                    "entityType": "PRIMARY"
                }
            ],
            "offerType": "ONLINE_AND_STORE",
            "isTwoDayShippingEligible": true,
            "availableOnline": true
        },
        {
            "itemId": 10315764,
            "parentItemId": 10315764,
            "name": "Great Value Cheese Wow Pasteurized Process Cheddar Cheese Product, 8 oz",
            "salePrice": 2.98,
            "upc": "078742014692",
            "categoryPath": "Food/Fresh Food/Dairy, Eggs & Cheese/Cheese",
            "shortDescription": "&lt;p&gt;Made with real cheese.&lt;/p&gt;",
            "longDescription": "&lt;ul class=&quot;noindent&quot;&gt;&lt;li&gt;Milk&lt;/li&gt;&lt;li&gt;Whey&lt;/li&gt;&lt;li&gt;Water&lt;/li&gt;&lt;li&gt;Soybean oil&lt;/li&gt;&lt;/ul&gt;&lt;p&gt;Made with real cheese.&lt;/p&gt;",
            "thumbnailImage": "https://i5.walmartimages.com/asr/5acd833a-b22c-4246-91e1-e0eb6b206ccc_1.a3c15f29ba9972c5d4cd90ffcd0a2924.jpeg?odnHeight=100&odnWidth=100&odnBg=FFFFFF",
            "mediumImage": "https://i5.walmartimages.com/asr/5acd833a-b22c-4246-91e1-e0eb6b206ccc_1.a3c15f29ba9972c5d4cd90ffcd0a2924.jpeg?odnHeight=180&odnWidth=180&odnBg=FFFFFF",
            "largeImage": "https://i5.walmartimages.com/asr/5acd833a-b22c-4246-91e1-e0eb6b206ccc_1.a3c15f29ba9972c5d4cd90ffcd0a2924.jpeg?odnHeight=450&odnWidth=450&odnBg=FFFFFF",
            "productTrackingUrl": "http://linksynergy.walmart.com/fs-bin/click?id=|LSNID|&offerid=223073.7200&type=14&catid=8&subid=0&hid=7200&tmpid=1082&RD_PARM1=https%253A%252F%252Fwww.walmart.com%252Fip%252FGreat-Value-Cheese-Wow-Pasteurized-Process-Cheddar-Cheese-Product-8-oz%252F10315764%253Faffp1%253DkvbuZXPc3N3bE003KuartHuz60EEPyKcpByLGQ7rDqk%2526affilsrc%253Dapi",
            "standardShipRate": 5.99,
            "marketplace": false,
            "modelNumber": "200310",
            "productUrl": "http://c.affil.walmart.com/t/api02?l=https%3A%2F%2Fwww.walmart.com%2Fip%2FGreat-Value-Cheese-Wow-Pasteurized-Process-Cheddar-Cheese-Product-8-oz%2F10315764%3Faffp1%3DkvbuZXPc3N3bE003KuartHuz60EEPyKcpByLGQ7rDqk%26affilsrc%3Dapi%26veh%3Daff%26wmlspartner%3Dreadonlyapi",
            "customerRating": "3.75",
            "numReviews": 20,
            "customerRatingImage": "http://i2.walmartimages.com/i/CustRating/3_8.gif",
            "categoryNode": "976759_1071964_976788",
            "bundle": false,
            "stock": "Available",
            "addToCartUrl": "http://c.affil.walmart.com/t/api02?l=http%3A%2F%2Faffil.walmart.com%2Fcart%2FaddToCart%3Fitems%3D10315764%7C1%26affp1%3DkvbuZXPc3N3bE003KuartHuz60EEPyKcpByLGQ7rDqk%26affilsrc%3Dapi%26veh%3Daff%26wmlspartner%3Dreadonlyapi",
            "affiliateAddToCartUrl": "http://linksynergy.walmart.com/fs-bin/click?id=|LSNID|&offerid=223073.7200&type=14&catid=8&subid=0&hid=7200&tmpid=1082&RD_PARM1=http%253A%252F%252Faffil.walmart.com%252Fcart%252FaddToCart%253Fitems%253D10315764%257C1%2526affp1%253DkvbuZXPc3N3bE003KuartHuz60EEPyKcpByLGQ7rDqk%2526affilsrc%253Dapi",
            "imageEntities": [
                {
                    "thumbnailImage": "https://i5.walmartimages.com/asr/9194e5eb-ee72-4c98-96f7-12fb26b1eb1c_1.51fc5bb9ff5e8838023b924e908c852c.jpeg?odnHeight=100&odnWidth=100&odnBg=FFFFFF",
                    "mediumImage": "https://i5.walmartimages.com/asr/9194e5eb-ee72-4c98-96f7-12fb26b1eb1c_1.51fc5bb9ff5e8838023b924e908c852c.jpeg?odnHeight=180&odnWidth=180&odnBg=FFFFFF",
                    "largeImage": "https://i5.walmartimages.com/asr/9194e5eb-ee72-4c98-96f7-12fb26b1eb1c_1.51fc5bb9ff5e8838023b924e908c852c.jpeg?odnHeight=450&odnWidth=450&odnBg=FFFFFF",
                    "entityType": "SECONDARY"
                },
                {
                    "thumbnailImage": "https://i5.walmartimages.com/asr/a45cc956-0bb2-4876-83ac-c5417c470708_1.f05db335d89c132f5aa9f7f974a8a6e6.jpeg?odnHeight=100&odnWidth=100&odnBg=FFFFFF",
                    "mediumImage": "https://i5.walmartimages.com/asr/a45cc956-0bb2-4876-83ac-c5417c470708_1.f05db335d89c132f5aa9f7f974a8a6e6.jpeg?odnHeight=180&odnWidth=180&odnBg=FFFFFF",
                    "largeImage": "https://i5.walmartimages.com/asr/a45cc956-0bb2-4876-83ac-c5417c470708_1.f05db335d89c132f5aa9f7f974a8a6e6.jpeg?odnHeight=450&odnWidth=450&odnBg=FFFFFF",
                    "entityType": "SECONDARY"
                },
                {
                    "thumbnailImage": "https://i5.walmartimages.com/asr/5acd833a-b22c-4246-91e1-e0eb6b206ccc_1.a3c15f29ba9972c5d4cd90ffcd0a2924.jpeg?odnHeight=100&odnWidth=100&odnBg=FFFFFF",
                    "mediumImage": "https://i5.walmartimages.com/asr/5acd833a-b22c-4246-91e1-e0eb6b206ccc_1.a3c15f29ba9972c5d4cd90ffcd0a2924.jpeg?odnHeight=180&odnWidth=180&odnBg=FFFFFF",
                    "largeImage": "https://i5.walmartimages.com/asr/5acd833a-b22c-4246-91e1-e0eb6b206ccc_1.a3c15f29ba9972c5d4cd90ffcd0a2924.jpeg?odnHeight=450&odnWidth=450&odnBg=FFFFFF",
                    "entityType": "PRIMARY"
                }
            ],
            "offerType": "ONLINE_AND_STORE",
            "isTwoDayShippingEligible": true,
            "availableOnline": true
        },
        {
            "itemId": 10295398,
            "parentItemId": 10295398,
            "name": "Kraft Grated Cheese Three Cheese Blend, 8 oz",
            "salePrice": 3.97,
            "upc": "021000016990",
            "categoryPath": "Food/Fresh Food/Dairy, Eggs & Cheese/Cheese",
            "shortDescription": "&lt;br&gt;",
            "longDescription": "&lt;p&gt;Kraft Grated Cheese 100% Real Parmesan is a blend of parmesan, romano and asiago cheeses. Add this product to your favorite pasta, salads and more for a delicious taste. This three-cheese blend, 8 oz, comes in a convenient shaker-top container.&lt;/p&gt;&lt;br&gt;",
            "thumbnailImage": "https://i5.walmartimages.com/asr/e1702112-d822-4ec2-acc1-dbaba1c50d4f_1.bf33716115709b8d99bb838d02eb615e.jpeg?odnHeight=100&odnWidth=100&odnBg=FFFFFF",
            "mediumImage": "https://i5.walmartimages.com/asr/e1702112-d822-4ec2-acc1-dbaba1c50d4f_1.bf33716115709b8d99bb838d02eb615e.jpeg?odnHeight=180&odnWidth=180&odnBg=FFFFFF",
            "largeImage": "https://i5.walmartimages.com/asr/e1702112-d822-4ec2-acc1-dbaba1c50d4f_1.bf33716115709b8d99bb838d02eb615e.jpeg?odnHeight=450&odnWidth=450&odnBg=FFFFFF",
            "productTrackingUrl": "http://linksynergy.walmart.com/fs-bin/click?id=|LSNID|&offerid=223073.7200&type=14&catid=8&subid=0&hid=7200&tmpid=1082&RD_PARM1=https%253A%252F%252Fwww.walmart.com%252Fip%252FKraft-Grated-Cheese-Three-Cheese-Blend-8-oz%252F10295398%253Faffp1%253DkvbuZXPc3N3bE003KuartHuz60EEPyKcpByLGQ7rDqk%2526affilsrc%253Dapi",
            "standardShipRate": 5.99,
            "marketplace": false,
            "modelNumber": "196",
            "productUrl": "http://c.affil.walmart.com/t/api02?l=https%3A%2F%2Fwww.walmart.com%2Fip%2FKraft-Grated-Cheese-Three-Cheese-Blend-8-oz%2F10295398%3Faffp1%3DkvbuZXPc3N3bE003KuartHuz60EEPyKcpByLGQ7rDqk%26affilsrc%3Dapi%26veh%3Daff%26wmlspartner%3Dreadonlyapi",
            "customerRating": "4.759",
            "numReviews": 29,
            "customerRatingImage": "http://i2.walmartimages.com/i/CustRating/4_8.gif",
            "categoryNode": "976759_1071964_976788",
            "bundle": false,
            "stock": "Available",
            "addToCartUrl": "http://c.affil.walmart.com/t/api02?l=http%3A%2F%2Faffil.walmart.com%2Fcart%2FaddToCart%3Fitems%3D10295398%7C1%26affp1%3DkvbuZXPc3N3bE003KuartHuz60EEPyKcpByLGQ7rDqk%26affilsrc%3Dapi%26veh%3Daff%26wmlspartner%3Dreadonlyapi",
            "affiliateAddToCartUrl": "http://linksynergy.walmart.com/fs-bin/click?id=|LSNID|&offerid=223073.7200&type=14&catid=8&subid=0&hid=7200&tmpid=1082&RD_PARM1=http%253A%252F%252Faffil.walmart.com%252Fcart%252FaddToCart%253Fitems%253D10295398%257C1%2526affp1%253DkvbuZXPc3N3bE003KuartHuz60EEPyKcpByLGQ7rDqk%2526affilsrc%253Dapi",
            "imageEntities": [
                {
                    "thumbnailImage": "https://i5.walmartimages.com/asr/2805f1e7-d4ee-4394-98c0-7f4bf07c29d4_1.37959e4677969230f817dcfba701295d.jpeg?odnHeight=100&odnWidth=100&odnBg=FFFFFF",
                    "mediumImage": "https://i5.walmartimages.com/asr/2805f1e7-d4ee-4394-98c0-7f4bf07c29d4_1.37959e4677969230f817dcfba701295d.jpeg?odnHeight=180&odnWidth=180&odnBg=FFFFFF",
                    "largeImage": "https://i5.walmartimages.com/asr/2805f1e7-d4ee-4394-98c0-7f4bf07c29d4_1.37959e4677969230f817dcfba701295d.jpeg?odnHeight=450&odnWidth=450&odnBg=FFFFFF",
                    "entityType": "SECONDARY"
                },
                {
                    "thumbnailImage": "https://i5.walmartimages.com/asr/767f343a-6f0b-4e6c-8add-45757634fa41_1.e14046e7225b93f3fce5066de78ad23b.jpeg?odnHeight=100&odnWidth=100&odnBg=FFFFFF",
                    "mediumImage": "https://i5.walmartimages.com/asr/767f343a-6f0b-4e6c-8add-45757634fa41_1.e14046e7225b93f3fce5066de78ad23b.jpeg?odnHeight=180&odnWidth=180&odnBg=FFFFFF",
                    "largeImage": "https://i5.walmartimages.com/asr/767f343a-6f0b-4e6c-8add-45757634fa41_1.e14046e7225b93f3fce5066de78ad23b.jpeg?odnHeight=450&odnWidth=450&odnBg=FFFFFF",
                    "entityType": "SECONDARY"
                },
                {
                    "thumbnailImage": "https://i5.walmartimages.com/asr/e1702112-d822-4ec2-acc1-dbaba1c50d4f_1.bf33716115709b8d99bb838d02eb615e.jpeg?odnHeight=100&odnWidth=100&odnBg=FFFFFF",
                    "mediumImage": "https://i5.walmartimages.com/asr/e1702112-d822-4ec2-acc1-dbaba1c50d4f_1.bf33716115709b8d99bb838d02eb615e.jpeg?odnHeight=180&odnWidth=180&odnBg=FFFFFF",
                    "largeImage": "https://i5.walmartimages.com/asr/e1702112-d822-4ec2-acc1-dbaba1c50d4f_1.bf33716115709b8d99bb838d02eb615e.jpeg?odnHeight=450&odnWidth=450&odnBg=FFFFFF",
                    "entityType": "PRIMARY"
                }
            ],
            "offerType": "ONLINE_AND_STORE",
            "isTwoDayShippingEligible": true,
            "availableOnline": true
        },
    ]
  }
]

export default BasketList;