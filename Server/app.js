const express = require("express");
const socketIO = require("socket.io");
const cors = require("cors");
const formatMsg = require("./utils/formatMessage");
const mongoose = require("mongoose");
const Message = require("./models/message");
const messagesRoute = require("./Routes/message");
const dotenv = require("dotenv").config();
const app = express();
app.use(cors());

app.use(messagesRoute);
// connecting to mongodb
mongoose
  .connect(process.env.MONGODB_SERVER)
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch((err) => {
    console.log("Not Connected to database!!!!!");
    console.log(err);
  });
const server = app.listen(8000, () => {
  console.log("Server is running at port 8000!!!");
});

const io = socketIO(server, { cors: "*" });

const users = [];

const saveUser = (id, username, room) => {
  const user = { id, username, room };
  users.push(user);
  return user;
};

const disconnectedUser = (id) => {
  const index = users.findIndex((user) => user.id === id);
  if (index !== -1) {
    return users.splice(index, 1)[0];
  }
};

// getting all user in the same room
const getUsersFromSameRoom = (room) => {
  const sameUsers = users.filter((user) => user.room === room);
  return sameUsers;
};

// Run when client server connected
io.on("connection", (socket) => {
  console.log("Client Connected");
  const BOT = "Room admin";

  socket.on("joined_room", ({ username, room }) => {
    const user = saveUser(socket.id, username, room);
    socket.join(user.room);

    // send welcome message for the current join user
    socket.emit("message", formatMsg(BOT, "Welcome to the room!"));

    // send message to the existing user that another user joined the room
    socket.broadcast
      .to(user.room)
      .emit("message", formatMsg(BOT, `${user.username} joined the room`));

    // listen message from client
    socket.on("message_sent", (data) => {
      //sent message back to client
      io.to(user.room).emit("message", formatMsg(user.username, data));
      Message.create({
        userId: socket.id,
        username: user.username,
        room: user.room,
        message: data,
      })
        .then(() => {
          console.log("Message has been saved to database");
        })
        .catch((err) => {
          console.log(err);
        });
    });

    // sending same room users
    io.to(user.room).emit("room_users", getUsersFromSameRoom(user.room));
  });

  // sending disconnect message to all users
  socket.on("disconnect", (_) => {
    const user = disconnectedUser(socket.id);
    if (user) {
      io.to(user.room).emit(
        "message",
        formatMsg(BOT, `${user.username} left the room`)
      );
      // sending same room users
      io.to(user.room).emit("room_users", getUsersFromSameRoom(user.room));
    }
  });
});
