const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    userId: Number,
    name: String,
    email: String,
});

const UserModel = mongoose.model('User',UserSchema);

module.exports = UserModel;