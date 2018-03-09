const request = require('request');
const axios = require('axios');
var Promise = require('bluebird');

// var terms = ['apple juice', 'butter', 'bacon']
// var term = 'peanut butter';
// var walmartLabsKey = '5jggjhsnfbfww54agx8f7vb8';

const getProducts = function (terms, cb) {
  var promises = [];
  for (var i = 0; i < terms.length; i++ ) {
    promises.push(searchOneTerm(terms[i]))
  }
  Promise.all(promises).then((data) => {
    cb(promises);
  })
}

const searchOneTerm = function (term) {
    return axios.get(`http://api.walmartlabs.com/v1/search?apiKey=${walmartLabsKey}&query=${term}&sort=relevance`)
}
