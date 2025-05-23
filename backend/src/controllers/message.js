import cloudinary from "../lib/cloudinary.js";
import { getReceiverSocketId, io } from "../lib/socket.js";
import { messageModel } from "../models/message.js";
import { userModel } from "../models/user.js";

export const getUsersForSidebar = async (req, res) => {
  try {
    const loggedInuserId = req.user._id;
    const filterUsers = await userModel
      .find({ _id: { $ne: loggedInuserId } })
      .select("-password");
    res.status(200).json(filterUsers);
  } catch (err) {
    console.log("error in message controller ", err);
    res.status(500).json({ error: "internal server error" });
  }
};

export const getMessage = async (req, res) => {
  try {
    const { id: userToChatId } = req.params;
    const myId = req.user._id;

    const message = await messageModel.find({
      $or: [
        { senderId: myId, receiverId: userToChatId },
        { senderId: userToChatId, receiverId: myId },
      ],
    });
    res.status(200).json(message);
  } catch (err) {
    console.log("Error in getMessages controller");
    res.status(500).json({ error: "Internal server error" });
  }
};

export const sendMessage = async (req, res) => {
  try {
    const { text, image } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id;

    let imageUrl;
    if (image) {
      const uploadResponse = await cloudinary.uploader.upload(image);
      imageUrl = uploadResponse.secure_url;
    }
    const newMessage = new messageModel({
      senderId,
      receiverId,
      text,
      image: imageUrl,
    });
    await newMessage.save();

    // todo : the socket.io code will we written here
    const receiverSocketId = getReceiverSocketId(receiverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", newMessage);
    }
    res.status(200).json(newMessage);
  } catch (err) {
    console.log("error in message controller", err.message);
    res.status(500).json({ message: "internal server error" });
  }
};
