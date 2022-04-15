const express = require("express");
const app = express();
const mysql = require('mysql')
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
app.use(cors(corsOpts));
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

let connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'test'
});

connection.connect(function(err) {
  if (err) {
    return console.error('error: ' + err.message);
  }

  console.log('Connected to the MySQL server.');
});

app.post('/login', (req, res) => {
  const user = req.query.user
  const email = req.query.email

  connection.query("select * from user where uname = ? and email = ?", [user, email], function (error, results, fields) {
    if (error) throw error;
    if(results.length > 0) res.send(results)
    else {

      connection.query("insert into user values(NULL, ?, ?, 'Valmiki', 320)", [email, user], function (error, results, fields) {
        if (error) throw error;
        res.send(results);
      });
      
    }
  });
})

app.get('/menu', (req, res) => {
  const veg = req.query.veg

  let query = "select * from menuitem";
  if(veg) query += " where isveg = true";
  connection.query(query, function (error, results, fields) {
    if (error) throw error;
    if(results.length > 0) res.send(results)
    else {
      res.send("No menu yet")
    }
  });
})

app.post('/order', (req, res) => {
  
  const order = req.body;

  connection.query("insert into orders values (NULL, ?, ?, 'Preparing', ?, 1000, 11)", [order.orderTime, order.orderTime + 1800, order.deliveryOption], function (error, results, fields) {
    if (error) throw error;
    res.send(results);
  });
})

app.get('/order-history', (req, res) => {
  
  const uid = req.query.id;

  connection.query("select * from orders where ordered_by = ? and status = 'Done'", [uid], function (error, results, fields) {
    if(results.length > 0) res.send(results)
    else {
      res.send("No completed orders")
    }
  });
})