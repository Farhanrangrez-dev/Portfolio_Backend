const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv").config();
const connectDB = require("./config/db");

// Connect to MongoDB
connectDB();

const app = express();


const fs = require("fs");

const uploadDir = path.join(__dirname, "uploads");

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));


const fileUpload = require('express-fileupload');

app.use(fileUpload({
  useTempFiles: true,
  tempFileDir: '/tmp/' // Railway ke liye MUST
}));

// Middleware
app.use(cors());
app.use(express.json());


app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'upload')));

// ✅ Upload folder static
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/projects", require("./routes/projectRoutes"));
app.use("/api/skills", require("./routes/skillRoutes"));
app.use("/api/experiences", require("./routes/experienceRoutes"));
app.use("/api/messages", require("./routes/messageRoutes"));
app.use("/api/hero-section", require("./routes/heroSectionRoutes"));
app.use("/api/settings", require("./routes/settingsRoutes"));
app.use("/api/profile", require("./routes/profileRoutes"));
app.use("/api/resume", require("./routes/resumeRoutes"));

// Dashboard stats endpoint
app.get("/api/dashboard/stats", require("./middleware/auth").protect, async (req, res) => {
  try {
    const Project = require("./models/Project");
    const Skill = require("./models/Skill");
    const Message = require("./models/Message");

    const [projects, skills, messages] = await Promise.all([
      Project.countDocuments({ user: req.user._id }),
      Skill.countDocuments({ user: req.user._id }),
      Message.countDocuments({ user: req.user._id, isRead: false }),
    ]);

    res.json({ projects, skills, unreadMessages: messages });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
