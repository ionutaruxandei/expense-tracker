var moment = require('moment');




module.exports = {
	getSundayAsISOString : function() {
		var sunday = moment().isoWeekday(7).endOf('day'); // .hour(1).day(1)
		return sunday._d.toISOString(); 
	},

	getMondayAsISOString : function() {
		var monday = moment().isoWeekday(1).startOf('day'); // .hour(2)
		return monday._d.toISOString(); 
	}
};
