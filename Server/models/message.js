const mongoose = require("mongoose");

const { model, Schema } = mongoose;

const messageSchema = new Schema({
  message: {
    type: String,
    required: true,
  },
  room: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  sent_at: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = model("Message", messageSchema);
