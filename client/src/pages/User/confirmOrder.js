import { useState } from "react";
import { Text, Paper, Table, Switch } from "@mantine/core";

export default function ConfirmOrder(props) {
  // console.log(props);
  let total = 0;
  let count = 1;
  let newMenu = [];
  let rowsData = props.order.map((item) => {
    props.menu.forEach((menuItem) => {
      if (menuItem.name === item.name) {
        // console.log(menuItem.name);
        total += menuItem.price * item.quantity;
        newMenu.push({
          srno: count,
          name: menuItem.name,
          price: menuItem.price,
          quantity: item.quantity,
        });
        count++;
      }
    });
    props.setTotal(total);
  });
  // console.log(newMenu);
  let rows = [];
  newMenu.map((item) => {
    rows.push(
      <tr key={item.srno}>
        <td>{item.name}</td>
        <td>{item.srno}</td>
        <td>₹{item.price}</td>
        <td>{item.quantity}</td>
        <td>₹{item.quantity * item.price}</td>
      </tr>
    );
  });
  // console.log(rows);

  return (
    <>
      <Paper
        shadow="lg"
        p="sm"
        withBorder
        sx={(theme) => ({
          backgroundColor: theme.colors.dark[1],
          width: "50%",
          marginTop: "20px ",
        })}
      >
        <Table fontSize="lg">
          <thead>
            <tr>
              <th>Sr.no</th>
              <th>Menu Item</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Item Total</th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </Table>
      </Paper>
      <Text sx={{ fontSize: "40px" }}>Total : ₹{total}</Text>
      <Text sx={{ marginBottom: "15px", marginTop: "15px", fontSize: "20px" }}>
        {" "}
        Hostel Delivery?{" "}
      </Text>
      <Switch
        onLabel="Yes"
        offLabel="No"
        size="xl"
        color="green"
        onChange={(e) => {
          // console.log(props.checked);
          props.setChecked(e.currentTarget.checked);
        }}
        value={props.checked}
      />
    </>
  );
}
