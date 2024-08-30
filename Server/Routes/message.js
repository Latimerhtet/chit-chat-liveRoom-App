const express = require("express");

const router = express.Router();
const messagesController = require("../Controllers/message");
router.get("/chat/:room", messagesController.getAllMessages);

module.exports = router;
