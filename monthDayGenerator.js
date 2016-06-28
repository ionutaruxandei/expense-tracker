/**
 * Created by ionut.aruxandei on 18/05/16.
 */
var moment = require('moment');

module.exports = {
    getStart : function() {

        return moment().startOf('month')._d.toISOString(); ;
    },

    getEnd : function() {

        return moment().endOf('month')._d.toISOString(); ;
    }
}

console.log(moment().endOf('month')._d.toISOString())