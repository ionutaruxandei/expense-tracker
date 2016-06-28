'use strict';

module.exports = function(Products, app) {
  
  var products = require('../controllers/articles')(Products);

  app.route('/api/products')
    .get(products.all);
  app.route('/api/products/name/:productName')
    .get(products.getByName);

  // Finish with setting up the articleId param
  app.param('productName', products.product);
};
