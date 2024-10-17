const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const User = require("../models/User");
const Ticket = require("../models/Ticket");
const Wallet = require("../models/Wallet");
require("dotenv").config();

const registerSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "2h" });
};

const createNewUser = async (name, email, password, role = "user") => {
  const userExists = await User.findOne({ email });
  if (userExists) {
    throw new Error("An account already exists with the given Email");
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    role,
  });
  return user;
};

const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  const { error } = registerSchema.validate({ name, email, password });
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  try {
    const user = await createNewUser(name, email, password);
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const createAdmin = async (req, res) => {
  const { name, email, password } = req.body;
  const { error } = registerSchema.validate({ name, email, password });
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  try {
    const adminUser = await createNewUser(name, email, password, "admin");
    res.status(201).json({
      _id: adminUser._id,
      name: adminUser.name,
      email: adminUser.email,
      role: adminUser.role,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const { error } = loginSchema.validate({ email, password });
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  try {
    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id),
      });
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const wallet = await Wallet.findOne({ user: req.user.id });
    const ticket = await Ticket.find({ user: req.user.id });
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      wallet: wallet
        ? {
            balance: wallet.balance,
            transactions: wallet.transactions,
          }
        : { balance: 0, transactions: [] },
      ticket,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  registerUser,
  createAdmin,
  loginUser,
  getUserProfile,
};
