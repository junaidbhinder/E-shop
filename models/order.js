const mongoose = require("mongoose");
const orderSchema = mongoose.Schema({
  name: String,
  image: String,
  countInStock: {
    type: Number,
    required: true,
  },
}, {
    versionKey: false,
  });

  orderSchema.virtual('id').get(function(){
    return this._id.toHexString();
  });
  
  // Ensure virtual fields are serialised.
  orderSchema.set('toJSON', {
    virtuals: true
  });

module.exports = mongoose.model("Order", orderSchema);
