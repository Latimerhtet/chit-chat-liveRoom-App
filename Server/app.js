const express = require("express");
const socketIO = require("socket.io");
const cors = require("cors");
const formatMsg = require("./utils/formatMessage");
const app = express();
app.use(cors());
const server = app.listen(8000, () => {
  console.log("Server is running at port 8000!!!");
});

const io = socketIO(server, { cors: "*" });

// Run when client server connected
io.on("connection", (socket) => {
  console.log("Client Connected");
  const BOT = "Room admin";
  // send welcome message for the current join user
  socket.emit("message", formatMsg(BOT, "Welcome to the room!"));

  // send message to the existing user that another user joined the room
  socket.broadcast.emit(
    "message",
    formatMsg(BOT, "Anonymous user joined the room")
  );

  socket.on("disconnect", (_) => {
    io.emit("message", formatMsg(BOT, "Anonymous user left the room"));
  });
});
