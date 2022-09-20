const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const eventSchema = new Schema({
  title: {
    type: String,
    require: true,
  },
  img: {
    type: String,
    require: true,
  },
  description: {
    type: String,
    require: true,
  },
  progress: {
    type: String,
    require: true,
  },
});

module.exports = mongoose.model("Event", eventSchema);
