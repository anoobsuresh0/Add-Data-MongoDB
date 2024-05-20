// models/user.js
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
});

const MarksSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  subject: String,
  marks: String,
});

const UserModel = mongoose.model('User', UserSchema);
const MarksModel = mongoose.model('Marks', MarksSchema);

module.exports = { UserModel, MarksModel };
