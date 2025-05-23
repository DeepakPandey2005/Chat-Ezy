import jwt from "jsonwebtoken";
import { userModel } from "../models/user.js";
export const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      return res
        .status(400)
        .json({ message: "Unauthorised -  No Token provided" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) {
      return res.status(400).json({
        message: "Unauthorised - Invalid token",
      });
    }
    const user = await userModel.findById(decoded.userId).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found " });
    }
    req.user = user;
    next();
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
};
