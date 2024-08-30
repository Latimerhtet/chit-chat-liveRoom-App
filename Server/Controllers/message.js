const Message = require("../models/message");
const ROOMS = ["Chill", "Study", "Meeting"];
exports.getAllMessages = (req, res, next) => {
  const roomStatus = req.params;
  if (ROOMS.includes(roomStatus.room)) {
    Message.find({ room: roomStatus.room })
      .select("username message sent_at")
      .then((messages) => {
        if (messages) {
          res.status(200).json(messages);
        }
      })
      .then((err) => {
        console.log(err);
      });
  } else {
    res.status(403).json("Invalid room");
  }
};
