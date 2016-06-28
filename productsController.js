'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Product = mongoose.model('Products'),
    config = require('meanio').loadConfig(),
    _ = require('lodash');

module.exports = function(Product) {

    return {
        product: function(req, res, next, id) {
            Article.load(id, function(err, product) {
                if (err) return next(err);
                if (!product) return next(new Error('Failed to load article ' + id));
                req.article = article;
                next();
            });
        },
        };

};