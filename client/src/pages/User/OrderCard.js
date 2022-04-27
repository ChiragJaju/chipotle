import React from "react";
import { Text, Paper, Button } from "@mantine/core";
import axios from "axios";

export default function OrderCard({ order, updateData, current }) {
  const date = new Date(order.order_time * 1000);
  const eta = new Date((order.order_time + 30 * 60) * 1000);
  const time = date.toLocaleString();
  let total = 0;
  const handleReady = async () => {
    const response = await axios.put(
      "http://localhost:5000/complete/" + order.oid
    );
    // console.log(response);
    updateData();
  };
  let color = current ? "red" : "green";
  return (
    <Paper shadow="md" p="md" withBorder sx={{ height: "100%" }}>
      <div style={{ justifyContent: "space-between", display: "flex" }}>
        <Text
          weight={500}
          sx={{ fontSize: "40px", marginBottom: "20px", display: "inline" }}
        >
          {order.delivery_pref}
        </Text>
      </div>
      <Text sx={{ fontSize: "20px", marginBottom: "10px" }}>
        OrderTime : {time}
      </Text>
      {current === true && (
        <Text sx={{ fontSize: "20px", marginBottom: "10px" }}>
          Estimated Completion Time : {eta.toLocaleTimeString()}
        </Text>
      )}
      <div></div>
      <Text sx={{ display: "inline", fontSize: "20px" }}>
        Status :
        <Text
          color={color}
          sx={{
            display: "inline",
            marginLeft: "10px",
            fontSize: "20px",
          }}
          weight={500}
        >
          {order.status}
        </Text>
      </Text>
      <Text sx={{ fontSize: "20px", marginTop: "10px" }}>
        Order Items :{" "}
        <ul>
          {order.items &&
            order.items.map((item) => {
              total += item.quantity * item.price;
              return (
                <li>
                  {item.name} x {item.quantity}
                </li>
              );
            })}
        </ul>
      </Text>
      <Text weight={500} sx={{ fontSize: "40px", marginBottom: "20px" }}>
        Total Bill Amount: ₹{total}
      </Text>
    </Paper>
  );
}

// delivery_pref: "Delivery"
// eta: 1650987192
// items: (2) [{…}, {…}]
// oid: 5014
// order_time: 1650985392
// ordered_by: "CHIRAG JAJU"
// status: "Preparing"
