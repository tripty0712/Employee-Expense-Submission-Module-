const mongoose = require("mongoose");

require("dotenv").config();

mongoose
  .connect(process.env.CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .catch((error) => {
    console.error(error);
  });

//mongoose.connect(process.env.CONNECTION_STRING);
const db = mongoose.connection;

db.once("open", () => {
  console.log("MongoDB connection established");
});

module.exports = mongoose;
