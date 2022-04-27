import { useEffect, useState } from "react";
import AdminCard from "../../components/Menu Card/AdminCard";
import OrderCard from "./OrderCard";
import { Grid, Button, Divider, ACTION_ICON_SIZES } from "@mantine/core";

export default function CurrentOrders() {
//   const [currentOrders, setCurrentOrders] = useState([{}]);
  // useEffect(() => {
  //   updateData();
  // }, []);
  // const updateData = async () => {
  //   const response = await axios.get("url");
  //   setCurrentOrders();
  // };
  const testArray = [
      {oid:'oid1', items:[{name:'Item1',price:20, quantity:2},{name:'Item2',price:30, quantity:1}]},
      {oid:'oid2', items:[{name:'Item3',price:60, quantity:3},{name:'Item4',price:300, quantity:1}]},
    ]
//   const testArray = [{name:"Item1", price:20, quantity:2},
//   {name:"Item2", price:30, quantity:1} ];

  return (
      <>
            <div style={{ display: "flex", justifyContent: "flex-start" }}>
            <Grid
            justify="center"
            sx={(theme) => ({
            //   backgroundColor: theme.colors.gray[2],
              marginBottom: "20px", marginRight: "30px" 
            //   "&:hover": {
            //     backgroundColor: theme.colors.gray[1],
            //   },
            })}
          >
            {(
                testArray.map(x => {
                    return <AdminCard 
                    oid={x.oid} 
                    items={x.items} />
                })
                
            )}
            </Grid>
            </div>
      </>
//     <>
//     {
//       testArray.map((item)=>{
//         return <AdminCard
//       })
//     }

//       <AdminCard
//       oid ="1"
//       oid=1
//       items = {testArray.map((item, i)=>{
//         retur(
//           <<>
//           name = {item.name}
//           price = {item.price}
//           quantity = {item.quantity}
//          </>>
//        );
//       });
//    } />

//     </>
  );
}
