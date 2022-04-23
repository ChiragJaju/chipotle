import React from "react";
import {
  Card,
  Image,
  Text,
  Badge,
  Button,
  Group,
  useMantineTheme,
  BackgroundImage,
} from "@mantine/core";
// import { process_params } from "express/lib/router";

export default function MenuCard(props) {
  const theme = useMantineTheme();
  const secondaryColor = theme.colors.gray[7];
  //   console.log(props);
  return (
    <Card
      shadow="sm"
      p="lg"
      sx={(theme) => ({
        // backgroundColor: theme.colors.dark[1],
      })}
    >
      <Card.Section>
        <Image
          sx={{ padding: "5px" }}
          src={props.image}
          height={200}
          alt="Norway"
        />
      </Card.Section>

      <Group
        position="apart"
        style={{
          marginBottom: 5,
          marginTop: theme.spacing.sm,
          justifyContent: "space-between",
        }}
      >
        <Text weight={500}>{props.name}</Text>
        <div>
          <Button
            color="dark"
            style={{ marginTop: 14, borderRadius: "20px", marginRight: "20px" }}
            size="xs"
            onClick={props.decrease}
          >
            -
          </Button>
          {props.quantity}
          <Button
            color="dark"
            style={{ marginTop: 14, borderRadius: "20px", marginLeft: "20px" }}
            size="xs"
            onClick={props.increase}
          >
            +
          </Button>
        </div>
      </Group>
    </Card>
  );
}
