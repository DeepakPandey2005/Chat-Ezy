import express from "express";
import dotenv from "dotenv";
import { connectDb } from "./lib/db.js";
import { authRouter } from "./routes/auth.js";
import cookieParser from "cookie-parser";
import { messageRouter } from "./routes/message.js";
import cors from "cors";
import { app, server } from "./lib/socket.js";
import path from "path";
dotenv.config();

const port = process.env.PORT || 3000;
const __dirname=path.resolve();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// app.use(express.json())
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));

app.use(cookieParser());

app.use("/api/auth", authRouter);
app.use("/api/messages", messageRouter);

app.get("/health", (req, res) => {
  res.send("all clear");
});

if(process.env.NODE_ENV==="production"){
  app.use(express.static(path.join(__dirname,"../frontend/dist")))

  app.get("*",(req,res)=>{
    req.sendFile(path.join(__dirname,"../frontend","dist","index.html"))

  })
}

server.listen(port, () => {
  console.log("server is running on http://localhost:" + port);
  console.log(process.env.MONGO_URL);
  connectDb();
});
