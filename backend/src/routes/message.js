import express from "express";
import { protectRoute } from "../middlewares/authMiddlewWare.js";
import {
  getUsersForSidebar,
  getMessage,
  sendMessage,
} from "../controllers/message.js";
export const messageRouter = express.Router();

messageRouter
  .get("/users", protectRoute, getUsersForSidebar)
  .get("/:id", protectRoute, getMessage)
  .post("/send/:id", protectRoute, sendMessage);
