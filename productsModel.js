'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;


/**
 * Article Schema
 */
var ProductSchema = new Schema({
  
  name: {
    type: String,
    required: true,
    trim: true
  },
  quantity: {
    type: Number,
    required: true,
    trim: true
  },
  unitPrice: {
    type: Number,
    required: true,
    trim: true
  },
  totalPrice: {
    type: Number,
    required: true,
    trim: true
  },
  category: {
  	type: String,
    required: true,
    trim: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  userId: {
    type : Schema.Types.ObjectId,
    required : true
  }
});



/**
 * Statics
 */
/*ProductSchema.statics.load = function(id, cb) {
  this.findOne({
    _id: id
  }).populate('user', 'name username').exec(cb);
};*/

var Product = mongoose.model('Product', ProductSchema);
module.exports = Product;
