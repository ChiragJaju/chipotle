import { useState } from "react";
import { Card, Text, Grid } from "@mantine/core";

export default function ItemsList(props) {
  let t = 0;

  for (let i = 0; i < props.list.length; i++) {
    t += props.list[i].quantity * props.list[i].price;
  }

  const total = t;

  return props.list.map((item) => (
    <Grid>
      <Grid.Col span={4}>
        <Card></Card>
      </Grid.Col>
      <Grid.Col span={4}>
        <Card></Card>
      </Grid.Col>
      <Grid.Col span={4}>
        <Card></Card>
      </Grid.Col>
    </Grid>
  ));
}
