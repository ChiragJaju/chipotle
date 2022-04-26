import { useState } from "react";
import { Card, Text, Badge } from "@mantine/core";

export default function OrderCard(props) {

  let b;
  let s;
  
  if (props.del == false)
  {
    b = "red";
    s = "Not Delivered";
  }
  else
  {
    b = "green";
    s = "Delivered";
  }

  const badgeCol = b;
  const text = s;
  
  return (
      <Card shadow="sm" p="lg">
        <Group
          position="apart"
          style={{ marginBottom: 5, marginTop: theme.spacing.sm }}
        >
          <Text weight={500}>Items</Text>
          <Badge color={badgeCol} variant="light">  
            {s}
          </Badge>
        </Group>
  );
}
