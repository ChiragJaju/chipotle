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
  Center,
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
        height: "300px",
        paddingRight:"20rem",
        paddingLeft:"20rem"
        // backgroundColor: theme.colors.dark[1],
      })}
    >
      <Group
        position="apart"
        style={{
          marginBottom: 5,
          marginLeft:5,
          marginTop: theme.spacing.sm,
          justifyContent: "space-between",
          flexDirection: "column",
          paddingRight:20
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "1rem",
          }}
        >
          <Text weight={500}>{props.oid}</Text>
          <h3>Order Items</h3>
          
          <ul>
            {props.items.map(x => {
              return (
                
              <table>
                <tr>
                <td>{x.name}</td>
                <td>{x.price}</td>
                <td>{x.quantity}</td>

                </tr>
                
              </table>
              )
            })}
          </ul>

        </div>
        <div>
        </div>
      </Group>
    </Card>
  );
}