import { useState, useEffect } from "react";
import { Grid, Button } from "@mantine/core";
import CustomMenuItem from "./CustomMenuItem";
import axios from "axios";
export default function CustomizeMenu() {
  const [isMenuChanged, setIsMenuChanged] = useState(false);
  const handleMenuChange = async () => {
    // console.log(menu);
    setIsMenuChanged(false);
    // const reponse = await axios.post("url", { menu });
  };
  const menu = [
    {
      mid: 0,
      name: "French_Fries",
      image:
        "https://aubreyskitchen.com/wp-content/uploads/2021/01/frozen-french-fries-in-air-fryer.jpg",
      price: 80,
      isVeg: true,
      available: true,
    },
    {
      mid: 0,
      name: "VegBurger",
      image:
        "https://www.vegrecipesofindia.com/wp-content/uploads/2020/12/burger-recipe-4.jpg",
      price: 70,
      isVeg: true,
      available: true,
    },
    {
      mid: 0,
      name: "ChickenBurger",
      image:
        "https://www.chicken.ca/wp-content/uploads/2020/09/Moist-Chicken-Burgers.jpg",
      price: 70,
      isVeg: false,
      available: true,
    },
    {
      mid: 0,
      name: "PaneerRoll",
      image:
        "https://simmertoslimmer.com/wp-content/uploads/2021/06/Paneer-Kathi-Roll.jpg",
      price: 70,
      isVeg: true,
      available: true,
    },
    {
      mid: 0,
      name: "EggRoll",
      image:
        "https://www.chefkunalkapur.com/wp-content/uploads/2021/08/CW0_7822-1300x865.jpg?v=1628745250",
      price: 70,
      isVeg: false,
      available: true,
    },
    {
      mid: 0,
      name: "ChickenRoll",
      image:
        "https://uploads-ssl.webflow.com/5c481361c604e53624138c2f/60f2ea67b471327a1d82959b_chicken%20roll_1500%20x%201200.jpg",
      price: 90,
      isVeg: false,
      available: true,
    },
    {
      mid: 0,
      name: "VegSandwich",
      image:
        "https://www.indianhealthyrecipes.com/wp-content/uploads/2019/05/club-sandwich-recipe.jpg",
      price: 70,
      isVeg: true,
      available: true,
    },
    {
      mid: 0,
      name: "PaneerSandwich",
      image:
        "https://www.indianhealthyrecipes.com/wp-content/uploads/2021/06/paneer-sandwich-recipe.jpg",

      price: 80,
      isVeg: true,
      available: true,
    },
    {
      mid: 0,
      name: "ChickenSandwich",
      image:
        "https://www.spicebangla.com/wp-content/uploads/2019/05/P1015dd224.jpg",
      price: 90,
      isVeg: false,
      available: true,
    },
  ];
  const [showMenu, setShowMenu] = useState(menu);

  // const [newMenu, setNewMenu] = useState(menu);
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
  };
  return (
    <>
      {isMenuChanged && (
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <Button
            sx={{ marginBottom: "20px", marginRight: "30px" }}
            color="dark"
            onClick={handleMenuChange}
          >
            Update Menu
          </Button>
        </div>
      )}
      <Grid
        justify="center"
        sx={(theme) => ({
          backgroundColor: theme.colors.gray[2],
          // "&:hover": {
          //   backgroundColor: theme.colors.gray[1],
          // },
        })}
      >
        {showMenu.map((item, i) => {
          return (
            <Grid.Col span={4}>
              <CustomMenuItem
                name={item.name}
                image={item.image}
                price={item.price}
                isVeg={item.isVeg}
                available={item.available}
                setIsMenuChanged={setIsMenuChanged}
                setAvailable={() => {
                  // console.log(item.available);
                  console.log(showMenu);
                  // item.available = !item.available;
                  menu[i].available = !menu[i].available;
                  setShowMenu(menu);
                }}
              />
            </Grid.Col>
          );
        })}
      </Grid>
    </>
  );
}
