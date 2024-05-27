import express from "express";
import { Server } from "socket.io";
import http from "http";
import getUserDetailsFromToken from "../helpers/getUserDetailsFromToken.js";

const app = express();

// socket connection
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_URL,
    credential: true,
  },
});
//online user
const onlineUser = new Set();
io.on("connection", async (socket) => {
  // console.log("connected user", socket.id);
  const token = socket.handshake.auth.token;
  // current user details
  const user = await getUserDetailsFromToken(token);
  // create a room
  socket.join(user?._id);
  onlineUser.add(user?._id);
  io.emit("onlineUser", Array.from(onlineUser));
  //disconnect
  socket.on("disconnect", () => {
    onlineUser.delete(user?._id);
    // console.log("disconnect user", socket.id);
  });
});

export { app, server };
