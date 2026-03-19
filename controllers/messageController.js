const Message = require("../models/Message");

// GET /api/messages
const getMessages = async (req, res) => {
  try {
    const messages = await Message.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// POST /api/messages (public - from contact form)
const createMessage = async (req, res) => {
  try {
    const message = await Message.create(req.body);
    res.status(201).json(message);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// PUT /api/messages/:id/read
const markAsRead = async (req, res) => {
  try {
    const message = await Message.findOne({ _id: req.params.id, user: req.user._id });
    if (!message) return res.status(404).json({ message: "Message not found" });

    message.isRead = true;
    await message.save();
    res.json(message);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE /api/messages/:id
const deleteMessage = async (req, res) => {
  try {
    const message = await Message.findOneAndDelete({ _id: req.params.id, user: req.user._id });
    if (!message) return res.status(404).json({ message: "Message not found" });
    res.json({ message: "Message deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getMessages, createMessage, markAsRead, deleteMessage };
