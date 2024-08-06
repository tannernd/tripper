require("dotenv").config();

const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://" +
    process.env.MONGODB_USER +
    ":" +
    encodeURIComponent(process.env.MONGODB_PASSWORD) +
    "@cluster0.ioujthj.mongodb.net/tripper?retryWrites=true&w=majority&appName=Cluster0" ||
    "mongodb://127.0.0.1:27017/tripper"
);

module.exports = mongoose.connection;
