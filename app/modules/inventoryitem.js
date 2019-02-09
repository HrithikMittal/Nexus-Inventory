var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var DetailSchema = new Schema({
  mobile_no: String,
  inventory_name: String,
  inventory_category: String,
  inventory_qty: String,
  inventory_cost: String
});

module.exports = mongoose.model('Details', DetailSchema);