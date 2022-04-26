import { useState, useContext, useEffect } from "react";
import MenuCard from "../../components/Menu Card/MenuCard";
import { Grid, Button, Divider, ACTION_ICON_SIZES } from "@mantine/core";
import ConfirmOrder from "./confirmOrder";
import AuthContext from "../../context/AuthContext";
import axios from "axios";
export default function Menu(props) {
  //UseState
  const [stateMenu, setStateMenu] = useState({
    French_Fries: 0,
    VegBurger: 0,
    ChickenBurger: 0,
    PaneerRoll: 0,
    EggRoll: 0,
    ChickenRoll: 0,
    VegSandwich: 0,
    PaneerSandwich: 0,
    ChickenSandwich: 0,
    VegSub: 0,
    ChickenSub: 0,
  });
  const [confirmOrder, setConfirmOrder] = useState(false);
  const [order, setOrder] = useState([[]]);
  const [total, setTotal] = useState(0);
  const { user } = useContext(AuthContext);
  const [checked, setChecked] = useState(false);

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
    const date = new Date();
    await getMenu();
    // console.log(menu);
    const items = [];
    menu.map((item) => {
      if (stateMenu[item.name] !== 0)
        items.push({ id: item.mid, quantity: stateMenu[item.name] });
    });
    const response = await axios.post("http://localhost:5000/order", {
      orderTime: Math.floor(date.getTime() / 1000),
      email: user.email,
      deliveryOption: checked ? "Delivery" : "Takeaway",
      items: items,
    });
    // console.log(response);
    props.setWhatToShow("Current Orders User");
    setConfirmOrder(false);
  };
  useEffect(() => {
    getMenu();
  }, []);

  const getMenu = async () => {
    const response = await axios.get("http://localhost:5000/menu");
    response.data.map((item, i) => {
      menu[i].mid = item.mid;
      if (item.availability === 0) menu[i].available = false;
    });
    setShowMenu(menu);
    // console.log(menu);
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

  const incVegBurger = () => {
    setStateMenu((past) => {
      return { ...past, VegBurger: past.VegBurger + 1 };
    });
  };
  const decVegBurger = () => {
    if (stateMenu.VegBurger > 0)
      setStateMenu((past) => {
        return { ...past, VegBurger: past.VegBurger - 1 };
      });
  };
  const incChickenBurger = () => {
    setStateMenu((past) => {
      return { ...past, ChickenBurger: past.ChickenBurger + 1 };
    });
  };
  const decChickenBurger = () => {
    if (stateMenu.ChickenBurger > 0)
      setStateMenu((past) => {
        return { ...past, ChickenBurger: past.ChickenBurger - 1 };
      });
  };
  const incPaneerRoll = () => {
    setStateMenu((past) => {
      return { ...past, PaneerRoll: past.PaneerRoll + 1 };
    });
  };
  const decPaneerRoll = () => {
    if (stateMenu.PaneerRoll > 0)
      setStateMenu((past) => {
        return { ...past, PaneerRoll: past.PaneerRoll - 1 };
      });
  };
  const incEggRoll = () => {
    setStateMenu((past) => {
      return { ...past, EggRoll: past.EggRoll + 1 };
    });
  };
  const decEggRoll = () => {
    if (stateMenu.EggRoll > 0)
      setStateMenu((past) => {
        return { ...past, EggRoll: past.EggRoll - 1 };
      });
  };
  const incChickenRoll = () => {
    setStateMenu((past) => {
      return { ...past, ChickenRoll: past.ChickenRoll + 1 };
    });
  };
  const decChickenRoll = () => {
    if (stateMenu.ChickenRoll > 0)
      setStateMenu((past) => {
        return { ...past, ChickenRoll: past.ChickenRoll - 1 };
      });
  };
  const incVegSandwich = () => {
    setStateMenu((past) => {
      return { ...past, VegSandwich: past.VegSandwich + 1 };
    });
  };
  const decVegSandwich = () => {
    if (stateMenu.VegSandwich > 0)
      setStateMenu((past) => {
        return { ...past, VegSandwich: past.VegSandwich - 1 };
      });
  };
  const incPaneerSandwich = () => {
    setStateMenu((past) => {
      return { ...past, PaneerSandwich: past.PaneerSandwich + 1 };
    });
  };
  const decPaneerSandwich = () => {
    if (stateMenu.PaneerSandwich > 0)
      setStateMenu((past) => {
        return { ...past, PaneerSandwich: past.PaneerSandwich - 1 };
      });
  };
  const incChickenSandwich = () => {
    setStateMenu((past) => {
      return { ...past, ChickenSandwich: past.ChickenSandwich + 1 };
    });
  };
  const decChickenSandwich = () => {
    if (stateMenu.ChickenSandwich > 0)
      setStateMenu((past) => {
        return { ...past, ChickenSandwich: past.ChickenSandwich - 1 };
      });
  };

  const menu = [
    {
      mid: 0,
      name: "French_Fries",
      image:
        "https://aubreyskitchen.com/wp-content/uploads/2021/01/frozen-french-fries-in-air-fryer.jpg",
      increase: incFrenchFries,
      decrease: decFrenchFries,
      quantity: stateMenu.French_Fries,
      price: 80,
      isVeg: true,
      available: true,
    },
    {
      mid: 0,
      name: "VegBurger",
      image:
        "https://www.vegrecipesofindia.com/wp-content/uploads/2020/12/burger-recipe-4.jpg",
      increase: incVegBurger,
      decrease: decVegBurger,
      quantity: stateMenu.VegBurger,
      price: 70,
      isVeg: true,
      available: true,
    },
    {
      mid: 0,
      name: "ChickenBurger",
      image:
        "https://www.chicken.ca/wp-content/uploads/2020/09/Moist-Chicken-Burgers.jpg",
      increase: incChickenBurger,
      decrease: decChickenBurger,
      quantity: stateMenu.ChickenBurger,
      price: 70,
      isVeg: false,
      available: true,
    },
    {
      mid: 0,
      name: "PaneerRoll",
      image:
        "https://simmertoslimmer.com/wp-content/uploads/2021/06/Paneer-Kathi-Roll.jpg",
      increase: incPaneerRoll,
      decrease: decPaneerRoll,
      quantity: stateMenu.PaneerRoll,
      price: 70,
      isVeg: true,
      available: true,
    },
    {
      mid: 0,
      name: "EggRoll",
      image:
        "https://www.chefkunalkapur.com/wp-content/uploads/2021/08/CW0_7822-1300x865.jpg?v=1628745250",
      increase: incEggRoll,
      decrease: decEggRoll,
      quantity: stateMenu.EggRoll,
      price: 70,
      isVeg: false,
      available: true,
    },
    {
      mid: 0,
      name: "ChickenRoll",
      image:
        "https://uploads-ssl.webflow.com/5c481361c604e53624138c2f/60f2ea67b471327a1d82959b_chicken%20roll_1500%20x%201200.jpg",
      increase: incChickenRoll,
      decrease: decChickenRoll,
      quantity: stateMenu.ChickenRoll,
      price: 90,
      isVeg: false,
      available: true,
    },
    {
      mid: 0,
      name: "VegSandwich",
      image:
        "https://www.indianhealthyrecipes.com/wp-content/uploads/2019/05/club-sandwich-recipe.jpg",
      increase: incVegSandwich,
      decrease: decVegSandwich,
      quantity: stateMenu.VegSandwich,
      price: 70,
      isVeg: true,
      available: true,
    },
    {
      mid: 0,
      name: "PaneerSandwich",
      image:
        "https://www.indianhealthyrecipes.com/wp-content/uploads/2021/06/paneer-sandwich-recipe.jpg",
      increase: incPaneerSandwich,
      decrease: decPaneerSandwich,
      quantity: stateMenu.PaneerSandwich,
      price: 80,
      isVeg: true,
      available: true,
    },
    {
      mid: 0,
      name: "ChickenSandwich",
      image:
        "https://www.spicebangla.com/wp-content/uploads/2019/05/P1015dd224.jpg",
      increase: incChickenSandwich,
      decrease: decChickenSandwich,
      quantity: stateMenu.ChickenSandwich,
      price: 90,
      isVeg: false,
      available: true,
    },
  ];
  const [showMenu, setShowMenu] = useState(menu);

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
          <ConfirmOrder
            order={order}
            menu={menu}
            setTotal={setTotal}
            checked={checked}
            setChecked={setChecked}
          />
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
            {" "}
            {showMenu.map((item, i) => {
              return (
                <>
                  {item.available === true && (
                    <Grid.Col span={4}>
                      <MenuCard
                        stateMenu={stateMenu}
                        name={item.name}
                        image={item.image}
                        increase={item.increase}
                        decrease={item.decrease}
                        quantity={stateMenu[item.name]}
                        price={item.price}
                        isVeg={item.isVeg}
                      />
                    </Grid.Col>
                  )}
                </>
              );
            })}
          </Grid>
        </>
      )}
    </>
  );
}
