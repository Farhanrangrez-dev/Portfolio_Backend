const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String },
    category: {
      type: String,
      required: true,
    },
    startDate: { type: Date },
    endDate: { type: Date },
  technologies: {
  type: [String],
  default: []
},
    liveUrl: { type: String },
    githubUrl: { type: String },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Project", projectSchema);