const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.SignUp = async (req, res) => {
  //   console.log(req.body);
  try {
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      res.status(400).send("User already exist");
    } else {
      let newUser = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: "",
      });

      let salt = await bcrypt.genSalt(10);
      newUser.password = await bcrypt.hash(req.body.password, salt);

      //   console.log(newUser);
      newUser = await newUser.save();
      res.status(200).send(newUser);
    }
  } catch (err) {
    res.status(400).send("some error");
  }
};

exports.Login = async (req, res) => {
  //   console.log(req.body);
  try {
    let user = await User.findOne({ email: req.body.email });
    // console.log(user);
    if (!user) {
      res.status(400).send("Please Signup");
    }
    const { _id, firstName, lastName, createdAt, email, password } = user;
    let validPass = await bcrypt.compare(req.body.password, password);

    if (!validPass) {
      res.status(400).send("Wrong Password");
    } else {
      const token = jwt.sign({ _id: _id }, process.env.JWT_PRIV_KEY);
      res
        .status(200)
        .header("x-auth-token", token)
        .send({ firstName, lastName, email, createdAt });
    }
  } catch (err) {
    res.status(400).send(err);
  }
};

// exports.allUser = async (req, res) => {
//   try {
//     const user = await User.find().select("-password");
//     res.status(200).send(user);
//   } catch (err) {
//     res.status(400).send(err);
//   }
// };

// exports.user = async (req, res) => {
//   try {
//     const user = await User.findById(req.params.id).select("-password");
//     res.status(200).send(user);
//   } catch (err) {
//     res.status(400).send(err);
//   }
// };

exports.user = async (req, res) => {
  try {
    console.log(req.user._id);
    const user = await User.findById(req.user._id).select("-password");
    console.log(user);
    res.status(200).send(user);
  } catch (err) {
    res.status(400).send(err);
  }
};
