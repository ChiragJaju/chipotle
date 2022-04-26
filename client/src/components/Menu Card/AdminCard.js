import React from "react";
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
// import { process_params } from "express/lib/router";

export default function AdminCard(props) {
  const theme = useMantineTheme();
  const secondaryColor = theme.colors.gray[7];
  //   console.log(props);
  return (
    <Card
      shadow="sm"
      p="lg"
      sx={(theme) => ({
        height: "330px",
        // backgroundColor: theme.colors.dark[1],
      })}
    >
      <Group
        position="apart"
        style={{
          marginBottom: 5,
          marginTop: theme.spacing.sm,
          justifyContent: "space-between",
          flexDirection: "column",
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
          {/* This will be used in bulleted list */}

          {/* {props.isVeg && ( 
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
           ) */}
          <Text weight={500}>{props.oid}</Text>
        </div>
        <div>
          {/* <View style={{ borderStyle: "solid", justifyContent: "center" }}>
            {props.items}
          </View> */}
        </div>
      </Group>
    </Card>
  );
}
