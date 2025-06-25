import User from "../model/userModel.js";
import validator from "validator";
import bcrypt from "bcryptjs";
import { genToken, genToken1 } from "../config/token.js";

// ✅ Registration
export const registration = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existUser = await User.findOne({ email });
    if (existUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json({ message: "Enter a valid Email" });
    }

    if (password.length < 8) {
      return res.status(400).json({ message: "Enter a strong password" });
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashPassword });

    const token = await genToken(user._id);
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    return res.status(201).json(user);
  } catch (error) {
    console.log("registration error");
    return res.status(500).json({ message: `Registration error: ${error}` });
  }
};

// ✅ User Login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Incorrect password" });
    }

    const token = await genToken(user._id);
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(201).json(user);
  } catch (error) {
    console.log("login error");
    return res.status(500).json({ message: `Login error: ${error}` });
  }
};

// ✅ Google Login
export const googleLogin = async (req, res) => {
  try {
    const { name, email } = req.body;

    let user = await User.findOne({ email });
    if (!user) {
      user = await User.create({ name, email });
    }

    const token = await genToken(user._id);
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json(user);
  } catch (error) {
    console.log("googleLogin error");
    return res.status(500).json({ message: `Google login error: ${error}` });
  }
};

// ✅ Admin Login (Fixed)
export const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      const token = await genToken1(email);
      res.cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: 1 * 24 * 60 * 60 * 1000, // 1 day
      });

      // ✅ Return email + role so frontend can use
      return res.status(200).json({
        email,
        role: "admin",
        token,
      });
    }

    return res.status(400).json({ message: "Invalid credentials" });
  } catch (error) {
    console.log("AdminLogin error");
    return res.status(500).json({ message: `AdminLogin error: ${error}` });
  }
};

// ✅ Logout
export const logOut = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });
    return res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    console.log("Logout error");
    return res.status(500).json({ message: `Logout error: ${error}` });
  }
};