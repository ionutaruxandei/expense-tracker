/**
 * Created by ionut.aruxandei on 30/05/16.
 */

var getStartAndEndDate = function(counter, timeUnit) {
    if(counter == 0) {
        if(timeUnit == "day"){
            return [moment().startOf("day").format("YYYY-MM-DD"), moment().endOf("day").format("YYYY-MM-DD")];
        }
        else if(timeUnit == "week") {
            return [moment().isoWeekday(1).startOf('day').format("YYYY-MM-DD"), moment().isoWeekday(7).endOf('day').format("YYYY-MM-DD")]
        }
        else {
            return [moment().startOf("month").format("YYYY-MM-DD"), moment().endOf("month").format("YYYY-MM-DD")];
        }
    }
    else {
        if(timeUnit == "day") {

            return [moment().subtract(counter, "day").startOf("day").format("YYYY-MM-DD"), moment().subtract(counter, "day").endOf("day").format("YYYY-MM-DD")]
        }
        else if(timeUnit == "week") {
            return [moment().isoWeekday(1).subtract(counter*7, "day").startOf('day').format("YYYY-MM-DD"),
                moment().isoWeekday(7).subtract(counter*7, "day").endOf('day').format("YYYY-MM-DD")]
        }
        else {
            return [moment().subtract(counter, "month").startOf("month").format("YYYY-MM-DD"),
                moment().subtract(counter, "month").endOf("month").format("YYYY-MM-DD")]
        }
    }
}

console.log()

