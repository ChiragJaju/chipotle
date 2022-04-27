import { useState } from "react";
import {
  Card,
  Image,
  Text,
  Badge,
  Button,
  Group,
  useMantineTheme,
  Switch,
  BackgroundImage,
} from "@mantine/core";
export default function CustomMenuItem(props) {
  //   console.log(props);
  const theme = useMantineTheme();
  const [isAvailable, setIsAvailable] = useState(props.available);
  return (
    <Card
      shadow="sm"
      p="lg"
      sx={(theme) => ({
        height: "330px",
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
          flexDirection: "column",
          // paddingBottom: "-100px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: "1rem",
          }}
        >
          {props.isVeg && (
            <div
              style={{
                height: "20px",
                width: "20px",
                backgroundColor: "green",
                borderRadius: "50%",
              }}
            ></div>
          )}
          {!props.isVeg && (
            <div
              style={{
                height: "20px",
                width: "20px",
                backgroundColor: "red",
                borderRadius: "50%",
              }}
            ></div>
          )}
          <Text weight={500}>
            {props.name} - ₹{props.price}
          </Text>{" "}
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <div style={{ display: "block" }}>
            <Switch
              label="Is Available"
              size="md"
              color="green"
              checked={isAvailable}
              onChange={(event) => {
                //event.currentTarget.checked
                props.setIsMenuChanged(true);
                props.setAvailable();
                setIsAvailable((x) => !x);
                // console.log(props.available);
              }}
            />
          </div>
        </div>
      </Group>
    </Card>
  );
}
