const Category = require("../models/category");
const product = require("../models/product");
const mongoose = require("mongoose");
module.exports = {
  async addproduct(req, res) {
    try {
      const category = await Category.findById(req.body.category);
      if (!category) {
        return res.status(400).send("Invalid category");
      }

      const products = await product.create({
        name: req.body.name,
        description: req.body.description,
        richDescription: req.body.richDescription,
        image: req.body.image,
        brand: req.body.brand,
        price: req.body.price,
        category: req.body.category,
        countInStock: req.body.countInStock,
        rating: req.body.rating,
        numRevies: req.body.numRevies,
        isFeatured: req.body.isFeatured,
      });
      // await products.save();
      res.status(201).send({ message: "products craeted success", products });
    } catch (error) {
      console.log(error);
      res.status(500).send({ error: error });
    }
  },
  async getPoductList(req, res) {
    try {
      const getproduct = await product.find().populate("category");
      res.status(200).send(getproduct);
    } catch (error) {
      console.log(error);
      res.status(500).send({ success: false, error });
    }
  },
  async getPoductById(req, res) {
    try {
      const getproduct = await product
        .findById(req.params.id)
        .populate("category");
      res.status(200).send(getproduct);
    } catch (error) {
      console.log(error);
      res.status(500).send({ success: false, error });
    }
  },
  async updateProduct(req, res) {
    try {
      const category = await Category.findById(req.body.category);
      if (!category) {
        return res.status(400).send("Invalid category");
      }
      const updateProducts = await product.findByIdAndUpdate(
        req.params.id,
        {
          name: req.body.name,
          description: req.body.description,
          richDescription: req.body.richDescription,
          image: req.body.image,
          brand: req.body.brand,
          price: req.body.price,
          category: req.body.category,
          countInStock: req.body.countInStock,
          rating: req.body.rating,
          numRevies: req.body.numRevies,
          isFeatured: req.body.isFeatured,
        },
        {
          new: true,
        }
      );
      if (!updateProducts) {
        res.status(400).send({ message: "Invalid product Id" });
      }
      res.status(200).send(updateProducts);
    } catch (error) {
      console.log(error);
      res.status(500).send({ success: false, error: error });
    }
  },
  async deletProductById(req, res) {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(404).send({ error: "invalid Product Id" });
    }

    const remove = product
      .findByIdAndRemove(req.params.id)
      .then((product) => {
        if (product) {
          return res
            .status(200)
            .json({ success: true, message: "the product is remove" });
        } else {
          return res
            .status(400)
            .json({ success: false, message: "the id can't match" });
        }
      })
      .catch((err) => {
        return res.status(500).json({ success: false, error: err });
      });
  },
  async countProduct(req, res) {
    const productcount = await product.countDocuments();

    if (!productcount) {
      return res.status(500).json({ success: false });
    }
    res.status(200).json({ productcount: productcount });
  },
  async getFeaturedProduct(req, res) {
    const count = req.params.count ? req.params.count: 0
    const productss = await product.find({ isFeatured: true }).limit(+count);
    console.log("------------------------------------");
    if (!productss) {
      return res.status(500).json({ success: false });
    }
    res.status(200).json({ productss: productss });
  },
};
