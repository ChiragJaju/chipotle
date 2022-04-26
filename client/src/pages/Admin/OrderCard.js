import { useState } from "react";
import { Card, Text, Badge } from "@mantine/core";

export default function OrderCard(props) {
  return (
    <div style={{ width: 450, margin }}>
      <Card shadow="sm" p="lg">
        <Group
          position="apart"
          style={{ marginBottom: 5, marginTop: theme.spacing.sm }}
        >
          <Text weight={500}>Items</Text>
          <Badge color="pink" variant="light">
            Delivered or not
          </Badge>
        </Group>

        
    </div>
  );
}
