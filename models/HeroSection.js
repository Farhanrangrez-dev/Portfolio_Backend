const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  icon: { type: String },
  description: { type: String },
  bgColor: { type: String, default: "#facc15" },
});

const heroSectionSchema = new mongoose.Schema(
  {
    greeting: { type: String, default: "Hello, I'm" },
    name: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String },
    bgColor: { type: String, default: "#000000" },
    textColor: { type: String, default: "#ffffff" },
    services: [serviceSchema],
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("HeroSection", heroSectionSchema);
