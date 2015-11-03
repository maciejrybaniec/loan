var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var AffiliationSchema = new Schema({
  name: String,
  idSale: Number,
  idDistributor: Number,
});
module.exports = mongoose.model('Affiliations', AffiliationSchema);
