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
//////////////////////////////////////////////////////
const mongoose = require("mongoose");
const mongoURI = process.env.DATABASE_DEPLOY; // Replace with your actual MongoDB URI

const connectDb = async () => {
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true, // Enable createIndex() for index creation
      // bufferCommands: false, // Experiment with buffering based on your needs
    });
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    // Retry connection or gracefully handle the error based on your application's requirements
    // Example: retryConnection();
    // Or: process.exit(1);
  }
};

module.exports = connectDb;
///////////////////////////////////
