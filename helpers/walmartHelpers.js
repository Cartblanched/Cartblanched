const request = require('request');
const axios = require('axios');
var Promise = require('bluebird');

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
  return axios.get(`http://api.walmartlabs.com/v1/search?apiKey=${process.env.WALMART_KEY}&query=${term}&sort=relevance`)
}
