/**
 * Created by ionut.aruxandei on 30/05/16.
 */


var showPrevious = function(expenses, timeUnit, counter) {
    if(timeUnit == "day") {
        return expenses.filter(function(expense){
            return expense.date > moment().subtract(counter, "day").startOf("day")._d.toISOString()
                && expense.date < moment().subtract(counter, "day").endOf("day")._d.toISOString();
        });
    }
    else if(timeUnit == "week") {
        return expenses.filter(function(expense){
            return expense.date > moment().isoWeekday(1).subtract(counter*7 - 1, "day").startOf('day')._d.toISOString()
                && expense.date < moment().isoWeekday(7).subtract(counter*7 - 1, "day").endOf('day')._d.toISOString();
        });
    }
    else if(timeUnit == "month") {
        return expenses.filter(function(expense){
            return expense.date > moment().subtract(counter, "month").startOf("month")._d.toISOString()
                && expense.date < moment().subtract(counter, "month").endOf("month")._d.toISOString()
        });
    }
}

var showInitial = function(expenses, timeUnit) {
    if (timeUnit == "day") {
        return expenses.filter(function (expense) {
            return expense.date > moment().startOf("day")._d.toISOString() && expense.date < moment().endOf("day")._d.toISOString();
        });
    }
    else if (timeUnit == "week") {
        return expenses.filter(function (expense) {
            return expense.date > moment().isoWeekday(1).startOf('day')._d.toISOString()
                && expense.date < moment().isoWeekday(7).endOf('day')._d.toISOString();
        });
    }
    else if (timeUnit == "month") {
        return expenses.filter(function (expense) {
            return expense.date > moment().startOf("month")._d.toISOString()
                && expense.date < moment().endOf("month")._d.toISOString()
        });
    }
}


