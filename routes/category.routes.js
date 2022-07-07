const express = require("express");
const router = express.Router();
const category = require("../controller/category");
router.post("/addcategory", category.categoryadd);
router.delete("/:id", category.removecategoryById);
router.get("/allcategory", category.getAllCategory);
router.get("/:id", category.findByIdCategory);
router.put("/:id", category.updateCategory);
module.exports = router;
