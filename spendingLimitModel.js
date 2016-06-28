'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;


/**
 * Article Schema
 */
var SpendingLimitSchema = new Schema({
  
  product: {
    type: String,
    required: true,
    trim: true
  },
  type: {
    type: String,
    required: true,
    trim: true
  },
  limitValue: {
    type: Number,
    required: true,
    trim: true
  },
  currentlySpent: {
    type: Number,
    required: true,
    trim: true
  },
  userId: {
    type : Schema.Types.ObjectId,
    required : true,
    trim: true
  }
});

SpendingLimitSchema.index({ userId: -1, product: 1, type: 1}, {unique: true});

/**
 * Statics
 */
/*ProductSchema.statics.load = function(id, cb) {
  this.findOne({
    _id: id
  }).populate('user', 'name username').exec(cb);
};*/

var SpendingLimit = mongoose.model('SpendingLimit', SpendingLimitSchema);
module.exports = SpendingLimit;
