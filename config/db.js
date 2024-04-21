// const mongoose = require("mongoose");

// const connectDb = async () => {
//   try {
//     await mongoose.connect(process.env.DATABASE_DEPLOY).then((res) => {
//       console.log("connect DataBase success");
//     });
//   } catch (error) {
//     console.error(error);
//     process.exit(1);
//   }
// };

// module.exports = connectDb;

const mongoose = require("mongoose");
const mongoURI = process.env.DATABASE_DEPLOY; // Replace with your actual MongoDB URI

const connectDb = async () => {
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};

module.exports = connectDb;
