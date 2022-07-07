const mongoose = require("mongoose");
const userSchema = mongoose.Schema(
  {
    name: String,
    image: String,
    countInStock: {
      type: Number,
      required: true,
    },
  },
  {
    versionKey: false,
  }
);

module.exports = mongoose.model("User", userSchema);
