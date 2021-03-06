const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const userSchema = new Schema({
  password: {type:String, required: true},
  username: {type: String, required: true},
  admin: {type:Boolean, required: true}
});

module.exports = mongoose.model('user', userSchema);
