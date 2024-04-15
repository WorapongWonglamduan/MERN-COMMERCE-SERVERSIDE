const { required, default: mongoose } = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
    },
    password: {
      type: String,
    },
    role: {
      type: String,
      default: "user",
    },
    enabled: {
      type: Boolean,
      default: false,
    },
    address: String,
  },
  { timestamps: true }
);

module.exports = User = mongoose.model("users", UserSchema);
