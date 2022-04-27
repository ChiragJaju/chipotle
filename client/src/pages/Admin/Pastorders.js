import { useEffect, useState } from "react";
import axios from "axios";
import { Grid } from "@mantine/core";
import OrderCard from "./OrderCard";
export default function Pastorders() {
  const [currentOrders, setCurrentOrders] = useState([{}]);
  useEffect(() => {
    updateData();
  }, []);
  const updateData = async () => {
    const response = await axios.get("http://localhost:5000/all-orders");
    const tempCur = response.data.filter((item) => {
      if (item.status === "Collected") return true;
      else return false;
    });
    setCurrentOrders(tempCur);
  };

  return (
    <>
      <Grid>
        {currentOrders.map((order) => {
          return (
            <Grid.Col
              sx={(theme) => ({
                backgroundColor: theme.colors.gray[5],
              })}
              span={4}
            >
              <OrderCard
                order={order}
                updateData={updateData}
                current={false}
              />
            </Grid.Col>
          );
        })}
      </Grid>
    </>
  );
}
