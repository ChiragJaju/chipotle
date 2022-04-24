import React from "react";
import { Text, Paper, Table } from "@mantine/core";

export default function confirmOrder(props) {
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
  });
  // console.log(newMenu);
  let rows = [];
  newMenu.map((item) => {
    rows.push(
      <tr key={item.srno}>
        <td>{item.name}</td>
        <td>{item.srno}</td>
        <td>{item.price}</td>
        <td>{item.quantity}</td>
        <td>{item.quantity * item.price}</td>
      </tr>
    );
  });
  // console.log(rows);
  console.log(total);
  return (
    <Paper
      shadow="lg"
      p="sm"
      withBorder
      sx={(theme) => ({
        backgroundColor: theme.colors.dark[1],
        width: "50%",
      })}
    >
      <Table>
        <thead>
          <tr>
            <th>Sr.no</th>
            <th>Menu Item</th>
            <th>Price</th>
            <th>Quantity</th>
            <th> Item Total</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    </Paper>
  );
}
