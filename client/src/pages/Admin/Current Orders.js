import { useEffect, useState } from "react";
import AdminCard from "../../components/Menu Card/AdminCard";
import OrderCard from "./OrderCard";
import { Grid, Text } from "@mantine/core";
import axios from "axios";

export default function CurrentOrders() {
  const [currentOrders, setCurrentOrders] = useState([{}]);
  useEffect(() => {
    updateData();
  }, []);
  const updateData = async () => {
    const response = await axios.get("http://localhost:5000/all-orders");
    const tempCur = response.data.filter((item) => {
      if (item.status === "Preparing") return true;
      else return false;
    });
    setCurrentOrders(tempCur);
  };

  return (
    <>
      {currentOrders.length === 0 && <Text size="xl"> No Current Orders.</Text>}
      <Grid>
        {currentOrders.map((order) => {
          return (
            <Grid.Col
              sx={(theme) => ({
                backgroundColor: theme.colors.gray[5],
              })}
              span={4}
            >
              <OrderCard order={order} updateData={updateData} current={true} />
            </Grid.Col>
          );
        })}
      </Grid>
    </>
  );
}
