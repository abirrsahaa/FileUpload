const mongoose = require("mongoose");
const user = require("./User");

const fileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: user,
  },
  title: {
    type: String,
  },
  content: {
    type: String,
  },
  imageUrl: {
    type: String,
  },
  tags: {
    type: String,
  },
});

const File = mongoose.model("File", fileSchema);
module.exports = File;
