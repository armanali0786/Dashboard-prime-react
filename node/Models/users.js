const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const userSchema = new Schema({
  id:{
    type: String,
    required: true,
  },
    name: {
        type: String,
        required: true,
      },
      username:{
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
        unique: true,
      },
      password:{
        type: String,
        required: true,
      },
      dob:{
        type: String,
        required: true,
      },
      no_of_companies:{
        type: String,
        required: true,
      },
      status:{
        type: String,
        required: true,
      },
      created_at:{
        type: String,
        required: true,
      },
      updated_at:{
        type: String,
        required: true,
      }
});

module.exports = User = mongoose.model("User", userSchema);