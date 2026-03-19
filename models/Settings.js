const mongoose = require("mongoose");

const settingsSchema = new mongoose.Schema(
  {
    phone: { type: String },
    email: { type: String },
    linkedin: { type: String },
    github: { type: String },
    twitter: { type: String },
    instagram: { type: String },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Settings", settingsSchema);
