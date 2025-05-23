import bcrypt from "bcrypt";
import { userModel } from "../models/user.js";
import { generateToken } from "../lib/utils.js";
import cloudinary from "../lib/cloudinary.js";

const signup = async (req, res) => {
  const { fullName, email, password } = req.body;

  if (!fullName || !email || !password) {
    res.status(400).json({ message: "all fields required" });
  }
  try {
    if (password.length < 6) {
      res
        .status(400)
        .json({ message: "Password must be at least 6 characters" });
    }

    const user = await userModel.findOne({ email });
    if (user) return res.status(400).json({ message: "user already exists" });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new userModel({
      fullName,
      email,
      password: hashedPassword,
    });

    if (newUser) {
      generateToken(newUser._id, res);
      await newUser.save();

      res.status(201).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email,
        profilePic: newUser.profilePic,
      });
    } else {
      res.status(400).json({ message: "invalid user data" });
    }
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: "internal server error" });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials " });
    }
    const isPassCorrect = await bcrypt.compare(password, user.password);
    if (!isPassCorrect) {
      return res.status(400).json({ message: "invalid credentials " });
    }
    generateToken(user._id, res);

    res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      profilePic: user.profilePic,
    });
  } catch (err) {
    console.log("Error in login controller", error.message);
    res.status(500).json({ message: "internal server Error" });
  }
};

const logOut = async (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "logged out successfully" });
  } catch (err) {
    console.log("error in logout controller", err.message);
    res.status(400).json({ message: "internal server error" });
  }
};

const updateProfile = async (req, res) => {
  try {
    const { profilePic } = req.body;

    const userId = req.user._id;

    if (!profilePic) {
      return res.status(400).json({ message: "Profile pic is required" });
    }
    const uploadResponse = await cloudinary.uploader.upload(profilePic);
    const updatedUser = await userModel.findByIdAndUpdate(
      userId,
      { profilePic: uploadResponse.secure_url },
      { new: true }
    );

    return res.status(200).json({ updatedUser });
  } catch (err) {
    console.log("Error in update profile ", err.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

const checkAuth = (req, res) => {
  try {
    res.status(200).json(req.user);
  } catch (err) {
    console.log("Error in ChkAuth controller", err.message);
    res.status(500).json({ message: "Internal server error " });
  }
};

export { login, signup, logOut, updateProfile, checkAuth };
