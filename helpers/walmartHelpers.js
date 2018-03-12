const request = require('request');
const axios = require('axios');
var Promise = require('bluebird');

const AISLE_TO_WALMART_CATEGORY = {
  'Alcoholic Beverages': '976759_976782',
  'Bakery/Bread': '976759_1071964_976779',
  'Baking': '976759_976780',
  'Beverages': '976759_976782',
  'Canned and Jarred': '976759_976794',
  'Cereal': '976759_976783',
  'Cheese': '976759_1071964_976788',
  'Condiments': '976759_976786',
  'Dried Fruits': '976759_976787_1044135',
  'Ethnic Foods': '976759',
  'Frozen': '976759_976791',
  'Gluten Free': '976759_1228023',
  'Gourmet': '976759',
  'Grilling Supplies': '5428_4089',
  'Health Foods': '976759',
  'Meat': '976759_1071964_976796',
  'Milk, Eggs, Other Dairy': '976759_1071964_976788',
  'Not in Grocery Store/Homemade': '976759',
  'Nut butters, Jams, and Honey': '976759_976786',
  'Nuts': '976759_976787_1001406',
  'Oil, Vinegar, Salad Dressing': '976759_976786',
  'Online': '976759',
  'Pasta and Rice': '976759_976794',
  'Produce': '976759_1071964',
  'Refrigerated': '976759',
  'Savory Snacks': '976759_976787',
  'Seafood': '976759_1071964_976796',
  'Spices and Seasonings': '976759_976786',
  'Sweet Snacks': '976759_976787',
  'Tea and Coffee': '976759',
}

const getProducts = (terms, aisles, cb) => {

  Promise.map(terms, function(term, idx) {
    if (AISLE_TO_WALMART_CATEGORY[aisles[idx]]) {
      var categoryId = AISLE_TO_WALMART_CATEGORY[aisles[idx]];
    } else {
      var categoryId = 976759;
    }
    return delayPromise(searchOneTerm(term, categoryId), 500);
  }, {concurrency: 2})
    .then((data) => {
      console.log(data);
      let parsedData = [];
      for (var i = 0; i < data.length; i++) {
        let itemString = data[i].data.query.replace(/'/g, "");
        itemString = itemString[0].toUpperCase() + itemString.substring(1);
        if (data[i].data.items) {
          data[i].data.items.forEach((item) => {
            if (!item.salePrice) {
              item.salePrice = 0;
            }
          });
        }
        parsedData.push({
          name: itemString,
          items: data[i].data.items
        });
      }
      cb(parsedData);
    })
    .catch((err) => {
      console.log(err);
    });
}

const delayPromise = (promise, delay) => {
  return Promise.delay(delay).then(() => {
    return promise;
  });
}

const searchOneTerm = (term, categoryId) => {
  return axios.get(`http://api.walmartlabs.com/v1/search?apiKey=${process.env.WALMART_KEY}&categoryId=${categoryId}&numItems=20&query='${term}'&sort=relevance`)
}


exports.getProducts = getProducts;