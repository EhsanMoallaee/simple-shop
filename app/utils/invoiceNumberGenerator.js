const moment = require("moment-jalali");

function invoiceNumberGenerator() {
    console.log(String(process.hrtime()[1]).padStart(9, 0));
    return (moment().format("YYYYMMDDHHmm")).concat(String(process.hrtime()[1]).padStart(9, 0));
}

module.exports = {
    invoiceNumberGenerator
}