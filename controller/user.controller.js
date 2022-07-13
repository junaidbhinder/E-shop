const user = require("../models/user");
const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
module.exports = {
  async userRegister(req, res) {
    try {
      const {
        name,
        email,
        password,
        phone,
        isAdmin,
        street,
        apartment,
        zip,
        city,
        country,
      } = req.body;

      const oldUser = await user.findOne({ email });

      if (oldUser) {
        return res.status(409).send({
          message: "User Already Exist. Please Provide another email",
        });
      } else {
        encryptedPassword = await bcrypt.hash(password, 10);

        const data = await user.create({
          name: req.body.name,
          email: req.body.email,
          password: encryptedPassword,
          phone: req.body.phone,
          isAdmin: req.body.isAdmin,
          street: req.body.street,
          apartment: req.body.apartment,
          zip: req.body.zip,
          city: req.body.city,
          country: req.body.country,
        });
        res.status(201).send(data);
      }
    } catch (error) {
      console.log(error);
      res.status(500).send({ success: false, error: error });
    }
  },
  async allUser(req, res) {
    const findUser = await user.find().select("-password");
    if (!findUser) {
      res.status(500).send({ success: false });
    }
    res.status(200).send(findUser);
  },
  async getUserById(req, res) {
    try {
      const data = await user.findById(req.params.id).select("-password");
      res.status(200).send(data);
    } catch (error) {
      console.log(error);
      res.status(500).send({ success: false, error });
    }
  },
  async loginUser(req, res) {
    try {
      const { email, password } = req.body;
      if (!(email && password)) {
        res.status(400).send("All input is required");
      }
      const userData = await user.findOne({ email: email });
      if (userData && (await bcrypt.compare(password, userData.password))) {
        let accessToken = jwt.sign(userData.toJSON(), process.env.TOKEN_KEY, {
          expiresIn: "2h",
        });
        return res.status(201).json({
          accessToken,
          userData,
        });
      }
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  },
  async currentuserlogin(req, res) {
    try {
      let _id = req._id;

      let usercurrent = await user.findOne({ _id: _id });
      if (usercurrent) {
        let accessToken = jwt.sign(
          usercurrent.toJSON(),
          process.env.TOKEN_KEY,
          {
            expiresIn: "2h",
          }
        );
        return res.status(201).json({
          accessToken,
          usercurrent,
        });
      }
    } catch (err) {
      console.log(err);
      res.status(500).send(err);
    }
  },
};
