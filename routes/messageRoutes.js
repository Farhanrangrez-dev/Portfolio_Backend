const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/auth");
const { getMessages, createMessage, markAsRead, deleteMessage } = require("../controllers/messageController");

router.route("/").get(protect, getMessages).post(createMessage);
router.put("/:id/read", protect, markAsRead);
router.delete("/:id", protect, deleteMessage);

module.exports = router;
