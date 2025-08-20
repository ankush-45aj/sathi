import User from "../models/User.js";
import jwt from "jsonwebtoken";

// REGISTER
export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password)
      return res.status(400).json({ message: "Please enter all fields ❌" });

    const existingUser = await User.findOne({ email: email.toLowerCase().trim() });
    if (existingUser)
      return res.status(400).json({ message: "User already exists ❌" });

    const newUser = new User({
      name,
      email: email.toLowerCase().trim(),
      password, // hashed by schema hook
    });

    await newUser.save();

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(201).json({
      message: "User registered successfully ✅",
      token,
      user: { id: newUser._id, name: newUser.name, email: newUser.email },
    });
  } catch (error) {
    console.error("Register Error:", error.message);
    res.status(500).json({ message: "Server error ❌" });
  }
};

// LOGIN
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).json({ message: "Please enter all fields ❌" });

    const user = await User.findOne({ email: email.toLowerCase().trim() });
    if (!user)
      return res.status(400).json({ message: "Invalid credentials ❌" });

    const isMatch = await user.matchPassword(password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials ❌" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json({
      message: "Login successful ✅",
      token,
      user: { id: user._id, name: user.name, email: user.email },
    });
  } catch (error) {
    console.error("Login Error:", error.message);
    res.status(500).json({ message: "Server error ❌" });
  }
};
