const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const fundraiserSchema = new Schema({
  id: {
     type: Number, 
     required: true,
     unique: true 
  },
  fundraisingHistory: Array
});

const Fundraiser = mongoose.model("Fundraiser", fundraiserSchema);

module.exports = Fundraiser;