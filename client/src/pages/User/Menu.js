import { useState, useContext } from "react";
import MenuCard from "../../components/Menu Card/MenuCard";
import { Grid, Button, Divider } from "@mantine/core";
import ConfirmOrder from "./confirmOrder";
import AuthContext from "../../context/AuthContext";
import axios from "axios";
export default function Menu(props) {
  //UseState
  const [stateMenu, setStateMenu] = useState({ French_Fries: 0, Burger: 0 });
  const [confirmOrder, setConfirmOrder] = useState(false);
  const [order, setOrder] = useState([[], []]);
  const [total, setTotal] = useState(0);
  const { user } = useContext(AuthContext);

  let l_order = [];
  // Submit function
  const handlePlaceOrder = () => {
    Object.keys(stateMenu).map((key) => {
      if (stateMenu[key] > 0) {
        l_order.push({ name: key, quantity: stateMenu[key] });
        // console.log(key);
      }
    });
    setOrder(l_order);
    // console.log(l_order);
    setConfirmOrder(true);
    // console.log(order);
  };
  const handleSubmit = async () => {
    // const response = await axios.post("url", {
    //   email: "",
    //   total: 0,
    //   order: l_order,
    // });
    // console.log(user);
    props.setWhatToShow("Current Orders User");
    setConfirmOrder(false);
  };

  // Increase Decrease Function for all menu items
  const incFrenchFries = () => {
    setStateMenu((past) => {
      return { ...past, French_Fries: past.French_Fries + 1 };
    });
  };
  const decFrenchFries = () => {
    if (stateMenu.French_Fries > 0)
      setStateMenu((past) => {
        return { ...past, French_Fries: past.French_Fries - 1 };
      });
  };

  const incBurger = () => {
    setStateMenu((past) => {
      return { ...past, Burger: past.Burger + 1 };
    });
  };
  const decBurger = () => {
    if (stateMenu.Burger > 0)
      setStateMenu((past) => {
        return { ...past, Burger: past.Burger - 1 };
      });
  };

  const menu = [
    {
      name: "French_Fries",
      image:
        "https://aubreyskitchen.com/wp-content/uploads/2021/01/frozen-french-fries-in-air-fryer.jpg",
      increase: incFrenchFries,
      decrease: decFrenchFries,
      quantity: stateMenu.French_Fries,
      price: 80,
    },
    {
      name: "Burger",
      image: "",
      increase: incBurger,
      decrease: decBurger,
      quantity: stateMenu.Burger,
      price: 70,
    },
  ];

  return (
    <>
      {confirmOrder === true && (
        <>
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <Button
              sx={{ marginBottom: "20px", marginRight: "30px" }}
              color="dark"
              onClick={handleSubmit}
            >
              Confirm Order
            </Button>
          </div>
          <Divider />
          <ConfirmOrder order={order} menu={menu} setTotal={setTotal} />
        </>
      )}
      {confirmOrder === false && (
        <>
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <Button
              sx={{ marginBottom: "20px", marginRight: "30px" }}
              color="dark"
              onClick={handlePlaceOrder}
            >
              Place Order
            </Button>
          </div>
          <Grid
            justify="center"
            sx={(theme) => ({
              backgroundColor: theme.colors.gray[2],
              // "&:hover": {
              //   backgroundColor: theme.colors.gray[1],
              // },
            })}
          >
            {menu.map((item) => {
              return (
                <Grid.Col span={4}>
                  <MenuCard
                    name={item.name}
                    image={item.image}
                    increase={item.increase}
                    decrease={item.decrease}
                    quantity={item.quantity}
                    price={item.price}
                  />
                </Grid.Col>
              );
            })}
          </Grid>
        </>
      )}
    </>
  );
}
