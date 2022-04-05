const express = require("express");
const app = express();
// const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
dotenv.config();

const corsOpts = {
  origin: "*",
  credentials: true,
  methods: ["GET", "POST", "HEAD", "PUT", "PATCH", "DELETE"],
  allowedHeaders: ["Content-Type"],
  exposedHeaders: ["Content-Type"],
};
// app.use(cors(corsOpts));
// mongoose.connect(process.env.MDB_CONNECT, {
//   useNewUrlParser: true,

//   useUnifiedTopology: true,
// });
// const db = mongoose.connection;

// db.on("error", console.error.bind(console, "connection error: "));

// db.once("open", function () {
//   console.log("Connected successfully");
// });

app.use(express.json({ limit: "50mb" }));
// app.use("/users", require("./routes/userRoutes"));

app.listen(5000, () => {
  console.log("Server is running at port 5000");
});
