import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { Grid, Text } from "@mantine/core";
import OrderCard from "./OrderCard";
import AuthContext from "../../context/AuthContext";
export default function Pastorders() {
  const [currentOrders, setCurrentOrders] = useState([{}]);
  const [isEmpty, setIsEmpty] = useState();
  const { user } = useContext(AuthContext);
  useEffect(() => {
    updateData();
  }, []);
  const updateData = async () => {
    const response = await axios.get(
      "http://localhost:5000/order-list/1?email=" + user.email
    );
    console.log(response);
    if (response.data !== "No orders to show") {
      setCurrentOrders(response.data);
      setIsEmpty(false);
    } else setIsEmpty(true);
  };

  return (
    <>
      {isEmpty === true && <Text size="xl"> No Current Orders.</Text>}
      {isEmpty === false && (
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
      )}
    </>
  );
}
