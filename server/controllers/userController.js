const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.createUser = async (req, res) => {
  const { username, email, bio, password, avatar } = req.body;
  const encryptedPass = await bcrypt.hash(password, 10);

  try {
    const user = await User.create({
      username,
      email,
      password: encryptedPass,
      bio,
      avatar,
    });
    return res.status(201).json({
      message: "Account Created!",
      user,
    });
  } catch (error) {
    return res.status(500).json({ message: "Error creating account", error });
  }
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const findByEmail = await User.findOne({ email });

    if (!findByEmail) {
      return res.json({
        message: "Account Not Found!",
      });
    }

    const decryptedPass = await bcrypt.compare(password, findByEmail.password);
    if (!decryptedPass) {
      return res.json({
        message: "Password Is Incorrect",
      });
    }

    const token = jwt.sign({ findByEmail }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    return res.status(200).json({
      message: "Logged In",
      token,
    });
  } catch (error) {
    return res.status(500).json({ message: "Login error", error });
  }
};

exports.getProfile = async (req, res) => {
  const { token } = req.body;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return res.status(200).json({
      user: decoded,
    });
  } catch (error) {
    return res.status(401).json({ message: "Invalid token", error });
  }
};
