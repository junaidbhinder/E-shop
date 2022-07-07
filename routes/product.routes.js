const express = require("express");
const router = express.Router();
const product = require("../controller/products.controller");

router.post("/createProducts", product.addproduct);
router.get("/getProductAll", product.getPoductList);
router.get("/:id", product.getPoductById);
router.put("/:id", product.updateProduct);
router.delete("/:id", product.deletProductById);
router.get("/countProduct/product", product.countProduct);
router.get("/featuredProduct/product/:count", product.getFeaturedProduct);
module.exports = router;
