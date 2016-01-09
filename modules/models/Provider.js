var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var ProviderSchema = new Schema({
  name: String,
  description: String,
  loanReceiveTime: String,
  extendPaidTime: String,
  tardinessCost: String,
  providerBankAccounts: Array,
  providerTelephone: String,
  providerLoanGiveTime: String,
  providerDatabases: Array,
  openTime: Array,
  rating: Number,
});
module.exports = mongoose.model('Providers', ProviderSchema);
