var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var LoanSchema = new Schema({
  amount: Number,
  commission: Number,
  days: Number,
  firstTime: Boolean,
  provider: String,
  name: String,
  rrso: Number,
  total: Number,
});
module.exports = mongoose.model('Loans', LoanSchema);
