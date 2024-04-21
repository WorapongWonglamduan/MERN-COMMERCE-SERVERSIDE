const mongoose = require("mongoose");

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_DEPLOY).then((res) => {
      console.log("connect DataBase success");
    });
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

module.exports = connectDb;
