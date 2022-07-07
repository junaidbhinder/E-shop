const mongoose = require("mongoose");

const proudctSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    description: {
      type: String,
      required: true,
    },
    rickDescription: {
      type: String,
      default: "",
    },

    image: {
      type: String,
      default: "",
    },
    images: [
      {
        type: String,
      },
    ],
    brand: {
      type: String,
      default: "",
    },
    price: {
      type: String,
      default: "",
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    countInstock: {
      type: Number,
      required: true,
      min: 0,
      max: 255,
    },
    rating: {
      type: Number,
      default: 0,
    },
    numReviews: {
      type: Number,
      default: 0,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    dateCreated: {
      type: Date,
      default: Date.now,
    },
  },
  {
    versionKey: false,
  }
);

module.exports = mongoose.model("Product", proudctSchema);
