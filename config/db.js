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
// const mongoose = require("mongoose");
// const mongoURI = process.env.DATABASE_DEPLOY; // Replace with your actual MongoDB URI

// const connectDb = async () => {
//   try {
//     await mongoose.connect(mongoURI, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//       // bufferCommands: false,
//     });
//     console.log("Connected to MongoDB");
//   } catch (error) {
//     console.error("Error connecting to MongoDB:", error);
//   }
// };

// module.exports = connectDb;
///////////////////////////////////
const { MongoClient, ServerApiVersion } = require("mongodb");
const uri = process.env.DATABASE_DEPLOY;
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});
const connectDb = async () => {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
};
module.exports = connectDb;
