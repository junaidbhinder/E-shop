const { response } = require("express");
const category = require("../models/category.");
module.exports = {
  async categoryadd(req, res) {
    try {
      const { name, icon, color } = req.body;

      const addcategory = await category.create({
        name,
        icon,
        color,
      });
      //   (await addcategory).save;
      res.status(200).send(addcategory);
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  },
  async removecategoryById(req, res) {
    const remove = category
      .findByIdAndRemove(req.params.id)
      .then((category) => {
        if (category) {
          return res
            .status(200)
            .json({ success: true, message: "the category is remove" });
        } else {
          return res
            .status(400)
            .json({ success: false, message: "the id can't match" });
        }
      })
      .catch((err) => {
        return res.status(400).json({ success: false, error: err });
      });
  },
  async getAllCategory(req, res) {
    try {
      const getCategoryall = await category.find({});
      if (getCategoryall) {
        res.status(200).send(getCategoryall);
      }
      if (!getCategoryall) {
        res.status(400).json({ message: "can't get" });
      }
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  },
  async findByIdCategory(req, res) {
    try {
      const getbyId = await category.findById(req.params.id);
      res.status(200).send(getbyId);
      if (!getbyId) {
        res.status(400).send({ message: "Id can't exist" });
      }
    } catch (error) {
      res.status(500).send(error);
    }
  },
};
