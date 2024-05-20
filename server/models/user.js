const mongoose = require('mongoose');


const tableSchema = new mongoose.Schema({
  name: String,
  columns: [{
    name: String,
    dataType: String
  }]
});


const TableModel = mongoose.model('Table', tableSchema);

module.exports = { UserModel, MarksModel, TableModel };
