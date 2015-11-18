'use strict';
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var NotificationSchema = new Schema({
  provider: String,
  email: String,
});
module.exports = mongoose.model('Notifications', NotificationSchema);
