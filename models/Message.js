// const mongoose = require("mongoose");

// const messageSchema = new mongoose.Schema(
//   {
//     senderName: { type: String, required: true },
//     senderEmail: { type: String, required: true },
//     content: { type: String, required: true },
//     isRead: { type: Boolean, default: false },
//     user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
//   },
//   { timestamps: true }
// );

// module.exports = mongoose.model("Message", messageSchema);




const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
  {
    senderName: { type: String, required: true },

    senderEmail: { 
      type: String, 
      required: true,
      match: [/^\S+@\S+\.\S+$/, "Please use a valid email address"]
    },

    subject: { type: String, required: true },

    message: { 
      type: String, 
      required: true,
      minlength: 5
    }, 
  },
  { timestamps: true }
);

module.exports = mongoose.model("Message", messageSchema);