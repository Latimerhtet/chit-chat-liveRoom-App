const express = require("express");
const socketIO = require("socket.io");
const cors = require("cors");
const app = express();
app.use(cors());
const server = app.listen(8000, () => {
  console.log("Server is running at port 8000!!!");
});

const io = socketIO(server, { cors: "*" });

// Run when client server connected
io.on("connection", (socket) => {
  console.log("Client Connected");
  socket.emit("message", "Welcome to the room");
});
