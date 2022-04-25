import { useEffect, useState } from "react";
export default function CurrentOrders() {
  const [currentOrders, setCurrentOrders] = useState([
    {
      deliveryOption: "",
      orderTime: "",
      deliverd: false,
      order: [{ name: "", price: 0, quantity: 0 }], // Needs some discussion
    },
  ]);

  return <></>;
}
