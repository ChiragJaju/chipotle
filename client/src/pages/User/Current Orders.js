import { useEffect, useState } from "react";
import MenuCard from "../../components/Menu Card/AdminCard";
// import OrderCard from "./OrdCardHead";
export default function CurrentOrders() {
  const [currentOrders, setCurrentOrders] = useState([
    {
      deliveryOption: "",
      orderTime: "",
      deliverd: false,
      order: [{ name: "", price: 0, quantity: 0 }], // Needs some discussion
    },
  ]);

  // return currentOrders.map((ord) => <OrderCard del={ord.delivered} />);
}
