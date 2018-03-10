const expect = require('chai').expect;
const assert = require('chai').assert;
const server = require('../index.js');
const path = require('path');
const supertest = require('supertest');

var request = supertest.agent(server);

// describe('server', function() {
//   describe('GET /', function () {
//     it('should return the content of index.html', function (done) {
//       // just assume that if it contains a <div> tag its index.html
//       request
//         .get('/')
//         .expect(200, /<div/, done);
//     });
//   });
// });


// describe('Server', function () {
//   it('/favorites', function () {
//     let result = serve.METHODNAMEGOESHERE
//     assert.equal(result, 'put the expected result here')
//   })
// })
