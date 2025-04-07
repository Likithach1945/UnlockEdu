
import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import validator from "validator";
import { sendEmail } from "../emailSending/sendEmail.js";

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    const exists = await userModel.findOne({ email });
    if (exists) {
      return res.status(400).json({ success: false, message: "User already exists" });
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json({ success: false, message: "Invalid email format" });
    }

    if (password.length < 8) {
      return res.status(400).json({ success: false, message: "Password must be at least 8 characters long" });
    }
    

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await userModel.create({ name, email, password: hashedPassword });

    const token = createToken(newUser._id);

    res.status(201).json({
      success: true,
      token,
      user: { name: newUser.name, email: newUser.email }
    });
  } catch (error) {
    console.error("Register error:", error.message || error);
    res.status(500).json({ success: false, message: "Server error during registration" });
  }
};

// Login User
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: "Invalid email or password" });
    }

    const token = createToken(user._id);
    res.status(200).json({ success: true, token, user: { name: user.name, email: user.email } });
  } catch (error) {
    console.error("Login error:", error.message);
    res.status(500).json({ success: false, message: "Server error during login" });
  }
};

// Create JWT Token
const createToken = (id) => {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT secret is not defined in environment variables.");
  }
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1h" });
};

// Send Email
const sendingMail = async (req, res) => {
  const { name, email, message } = req.body;

  if (![name, email, message].every(Boolean)) {
    return res.status(400).json({ success: false, message: "All fields are required." });
  }

  try {
    await sendEmail({
      email: process.env.RECEIVER_EMAIL,
      subject: "Contact Form Submission",
      message: `${name} (${email}) says: ${message}`,
    });
    res.status(200).json({ success: true, message: "Message sent successfully!" });
  } catch (error) {
    console.error("Email sending error:", error.message);
    res.status(500).json({ success: false, message: "Failed to send message. Please try again later." });
  }
};

export { loginUser, registerUser, sendingMail };
