const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: { type: String, require: true },
  email: { type: String, require: true },
  password: { type: String, min: 6, max: 12, require: true },
});

module.exports = mongoose.model('User', userSchema);
