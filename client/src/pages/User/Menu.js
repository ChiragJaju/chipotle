import { useState } from "react";
import MenuCard from "../../components/Menu Card/MenuCard";
import { Grid, Button } from "@mantine/core";
export default function Menu() {
  //UseState
  const [stateMenu, setStateMenu] = useState({ french_fries: 0, burger: 0 });
  const [confirmOrder, setConfirmOrder] = useState(false);

  let order = [];
  // Submit function
  const handlePlaceOrder = () => {
    setConfirmOrder(true);

    Object.keys(stateMenu).map((key) => {
      if (stateMenu[key] > 0) {
        order.push({ name: key, quantity: stateMenu[key] });
        // console.log(key);
      }
    });
    console.log(order);
  };
  const handleSubmit = () => {
    setConfirmOrder(false);
  };

  // Increase Decrease Function for all menu items
  const incFrenchFries = () => {
    setStateMenu((past) => {
      return { ...past, french_fries: past.french_fries + 1 };
    });
  };
  const decFrenchFries = () => {
    if (stateMenu.french_fries > 0)
      setStateMenu((past) => {
        return { ...past, french_fries: past.french_fries - 1 };
      });
  };

  const incBurger = () => {
    setStateMenu((past) => {
      return { ...past, burger: past.burger + 1 };
    });
  };
  const decBurger = () => {
    if (stateMenu.burger > 0)
      setStateMenu((past) => {
        return { ...past, burger: past.burger - 1 };
      });
  };

  const menu = [
    {
      name: "French Fries",
      image:
        "https://aubreyskitchen.com/wp-content/uploads/2021/01/frozen-french-fries-in-air-fryer.jpg",
      increase: incFrenchFries,
      decrease: decFrenchFries,
      quantity: stateMenu.french_fries,
    },
    {
      name: "Burger",
      image: "",
      increase: incBurger,
      decrease: decBurger,
      quantity: stateMenu.burger,
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
