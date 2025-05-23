import express from "express";
import {
  checkAuth,
  login,
  logOut,
  signup,
  updateProfile,
} from "../controllers/auth.js";
import { protectRoute } from "../middlewares/authMiddlewWare.js";
export const authRouter = express.Router();

authRouter
  .post("/login", login)
  .post("/signup", signup)
  .post("/logout", logOut)

  .put("/update-profile", protectRoute, updateProfile)
  .get("/check", protectRoute, checkAuth);
