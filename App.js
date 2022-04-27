const express = require("express");
const app = express();
const mysql = require("mysql");
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
  host: "localhost",
  user: "root",
  password: "password",
  database: "test",
  multipleStatements: true,
});

connection.connect(function (err) {
  if (err) {
    return console.error("error: " + err.message);
  }

  console.log("Connected to the MySQL server.");
});

app.post("/login", (req, res) => {
  const user = req.body.user;
  const email = req.body.email;

  console.log(user, email);

  connection.query(
    "select * from user where email = ?",
    [email],
    function (error, results, fields) {
      if (error) throw error;
      if (results.length > 0) res.send(results);
      else {
        connection.query(
          "insert into user values(NULL, ?, ?, 'Valmiki', 320)",
          [email, user],
          function (error, results, fields) {
            if (error) throw error;
            res.send(results);
          }
        );
      }
    }
  );
});

app.get("/menu", (req, res) => {
  const veg = req.query.veg;

  let query = "select * from menuitem";
  if (veg == 1) query += " where isveg = true";
  connection.query(query, function (error, results, fields) {
    if (error) throw error;
    if (results.length > 0) res.send(results);
    else {
      res.send("No menu yet");
    }
  });
});

app.post("/order", (req, res) => {
  const order = req.body;
  const email = req.body.email;

  let uid = 0;

  connection.query(
    "select uid from user where email = ?",
    [email],
    function (error, results, fields) {
      if (error) throw error;
      if (results.length > 0) uid = results[0].uid;

      if (uid == 0) res.send("Auth error!");
      else {
        connection.query(
          "insert into orders values (NULL, ?, ?, 'Preparing', ?, 1000, ?); select max(oid) as latest from orders;",
          [order.orderTime, order.orderTime + 1800, order.deliveryOption, uid],
          function (error, results, fields) {
            if (error) throw error;
            let oid = results[1][0].latest;

            order.items.forEach((item) => {
              connection.query("insert into order_items values(?, ?, ?)", [
                oid,
                item.id,
                item.quantity,
              ]);
            });

            res.send(results);
          }
        );
      }
    }
  );
});

app.get("/order-list/:t", (req, res) => {
  const email = req.query.email;
  const t = req.params.t;
  let uid = 0;
  // /0 for current orders
  // /1 for past orders

  connection.query(
    "select uid from user where email = ?",
    [email],
    function (error, results, fields) {
      if (error) throw error;
      if (results.length > 0) uid = results[0].uid;

      if (uid == 0) res.send("Auth error!");
      else {
        let query =
          "select A.oid, A.order_time, A.eta, A.status, A.delivery_pref, B.mname, B.price, C.quantity, D.uname as ordered_by from orders A, menuitem B, order_items C, user D where A.oid = C.oid and B.mid = C.mid and A.ordered_by = D.uid and A.ordered_by = ? and status in ";

        if (t == 0) query += "('Preparing', 'Ready')";
        else query += "('Collected')";

        connection.query(query, [uid], function (error, results, fields) {
          if (error) throw error;
          if (results.length > 0) {
            res.send(getOrders(results));
          } else {
            res.send("No orders to show");
          }
        });
      }
    }
  );
});

app.get("/all-orders", (req, res) => {
  connection.query(
    "select A.oid, A.order_time, A.eta, A.status, A.delivery_pref, B.mname, B.price, C.quantity, D.uname as ordered_by from orders A, menuitem B, order_items C, user D where A.oid = C.oid and B.mid = C.mid and A.ordered_by = D.uid",
    function (error, results, fields) {
      if (error) throw error;
      if (results.length > 0) {
        res.send(getOrders(results));
      } else {
        res.send("No orders to show");
      }
    }
  );
});

app.get("/order/:id", (req, res) => {
  const id = parseInt(req.params.id);

  connection.query(
    "select A.oid, A.order_time, A.eta, A.status, A.delivery_pref, B.mname, B.price, C.quantity, D.uname as ordered_by from orders A, menuitem B, order_items C, user D where A.oid = C.oid and B.mid = C.mid and A.ordered_by = D.uid and A.oid = ?",
    [id],
    function (error, results, fields) {
      if (error) throw error;
      if (results.length > 0) {
        res.send(getOrders(results)[0]);
      } else {
        res.send("No orders to show");
      }
    }
  );
});

app.put("/complete/:id", (req, res) => {
  const id = parseInt(req.params.id);

  connection.query(
    "update orders set status = 'Collected' where oid = ? ",
    [id],
    function (error, results, fields) {
      if (error) throw error;
      res.send(results);
    }
  );
});

const getOrders = (results) => {
  let temp = [];
  let final = [];
  results.forEach((item) => {
    if (temp.indexOf(item.oid) == -1) {
      temp.push(item.oid);
      let obj = {};
      obj.oid = item.oid;
      obj.order_time = item.order_time;
      obj.eta = item.eta;
      obj.status = item.status;
      obj.delivery_pref = item.delivery_pref;
      obj.ordered_by = item.ordered_by;
      obj.items = [
        { name: item.mname, price: item.price, quantity: item.quantity },
      ];
      final.push(obj);
    } else {
      final = final.map((obj) => {
        if (obj.oid == item.oid)
          obj.items.push({
            name: item.mname,
            price: item.price,
            quantity: item.quantity,
          });
        return obj;
      });
    }
  });

  return final;
};

app.delete("/order/:id", (req, res) => {
  const id = req.params.id;

  connection.query(
    "delete from orders where oid = ? and status != 'Collected'",
    [id],
    function (error, results, fields) {
      if (error) throw error;
      res.send(results);
    }
  );
});

app.post("/employ", (req, res) => {
  const body = req.body;

  connection.query(
    "insert into employee values(NULL, ?, ?, ?)",
    [body.name, body.date, body.phone],
    function (error, results, fields) {
      if (error) throw error;
      res.send(results);
    }
  );
});

app.put("/employ", (req, res) => {
  const body = req.body;

  connection.query(
    "update employee set ename = ?, joining_date = ?, e_phone = ? where eid = ?",
    [body.name, body.date, body.phone, body.id],
    function (error, results, fields) {
      if (error) throw error;
      res.send(results);
    }
  );
});

app.delete("/employ/:id", (req, res) => {
  const id = parseInt(req.params.id);

  connection.query(
    "delete from employee where eid = ?",
    [id],
    function (error, results, fields) {
      if (error) throw error;
      res.send(results);
    }
  );
});

app.post("/item", (req, res) => {
  const body = req.body;

  connection.query(
    "insert into menuitem values(NULL, ?, ?, ?, ?, ?)",
    [body.name, body.price, body.available, body.readymade, body.veg],
    function (error, results, fields) {
      if (error) throw error;
      res.send(results);
    }
  );
});

app.put("/menu", (req, res) => {
  const body = req.body;
  let query = "";

  body.forEach(item => {
    query += `update menuitem set mname = ${item.name}, price = ${item.price}, isveg = ${item.isveg}, availability = ${item.available} where mid = ${item.mid}; `
  })

  connection.query(query, function (error, results, fields) {
      if (error) throw error;
      res.send(results);
    }
  );
});

app.delete("/item/:id", (req, res) => {
  const id = parseInt(req.params.id);

  connection.query(
    "delete from menuitem where mid = ?",
    [id],
    function (error, results, fields) {
      if (error) throw error;
      res.send(results);
    }
  );
});
