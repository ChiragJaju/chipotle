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
  const user = req.body.user
  const email = req.body.email

  console.log(user, email)

  connection.query("select * from user where email = ?", [email], function (error, results, fields) {
    if (error) throw error;
    if(results.length > 0) res.send(results)
    else {

      connection.query("insert into user values(NULL, ?, ?, NULL, NULL)", [email, user], function (error, results, fields) {
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
  const email = req.body.email;

  let uid = 0;

  connection.query("select uid from user where email = ?", [email], function(error, results, fields) {
    if(error) throw error;
    if(results.length > 0) uid = results[0].uid;

    if(uid == 0) res.send("Auth error!")
    else {
      connection.query("insert into orders values (NULL, ?, ?, 'Preparing', ?, 1000, ?)", [order.orderTime, order.orderTime + 1800, order.deliveryOption, uid], function (error, results, fields) {
        if (error) throw error;
        let oid = 0;

        connection.query("select max(oid) from orders", function(error, results, fields) {
          if(error) throw error;

          oid = results[0].oid;

          order.items.forEach(item => {
            connection.query("insert into order_items values(?, ?, ?)", [oid, item.id, item.quantity]);
          });

        })
        res.send(results);
      });
    }
  })

})

app.get('/order-list/:t', (req, res) => {
  
  const email = req.query.email;
  const t = req.params.t;
  let uid = 0;
  // /0 for current orders
  // /1 for past orders

  connection.query("select uid from user where email = ?", [email], function(error, results, fields) {
    if(error) throw error;
    if(results.length > 0) uid = results[0].uid;

    if(uid == 0) res.send("Auth error!")
    else {

      let query = "select * from orders where ordered_by = ? and status in "

      if(t == 0) query += "('Preparing', 'Ready')"
      else query += "('Collected')"

      connection.query(query, [uid], function (error, results, fields) {
        if(error) throw error;
        if(results.length > 0) res.send(results)
        else {
          res.send("No orders to show")
        }
      });

    }

  })

  
})