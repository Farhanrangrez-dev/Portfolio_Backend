const mongoose = require("mongoose");

const resumeSchema = new mongoose.Schema(
  {
    filename: { type: String, required: true },
    filepath: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Resume", resumeSchema);
