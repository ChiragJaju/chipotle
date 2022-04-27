import { AppShell, Navbar, Header, Text } from "@mantine/core";
import { useState, useContext } from "react";
import AuthContext from "../context/AuthContext";
import { Menu2, ClipboardList, Logout, ListCheck } from "tabler-icons-react";
import SidebarButton from "../components/sidebarButton";
import CurrentOrders from "../pages/User/Current Orders";
import Menu from "../pages/User/Menu";
import Pastorders from "../pages/User/PastOrders";
import { signOut } from "firebase/auth";
import { auth } from "../services/firebase";

function Dashboard() {
  const { whatToShow, setWhatToShow, setUser } = useContext(AuthContext);

  const handleMenuClick = () => {
    setWhatToShow("Menu");
  };
  const handleCurrentOrdersClick = () => {
    setWhatToShow("Current Orders User");
  };
  const handlePastOrdersClick = () => {
    setWhatToShow("Past Orders");
  };
  const handleSignout = () => {
    setUser({ name: "none" });
    signOut(auth)
      .then(() => {
        console.log("Logged Out");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <AppShell
      padding="md"
      navbar={
        <Navbar width={{ base: 300 }} height={500} p="xs">
          <SidebarButton
            icon={<ClipboardList size={25} />}
            color="blue"
            label="Menu"
            onClick={handleMenuClick}
          />
          <SidebarButton
            icon={<Menu2 size={25} />}
            color="violet"
            label="Current Orders"
            onClick={handleCurrentOrdersClick}
          />
          <SidebarButton
            icon={<ListCheck size={25} />}
            color="green"
            label="Past Orders"
            onClick={handlePastOrdersClick}
          />
          <SidebarButton
            icon={<Logout size={25} />}
            color="red"
            label="Sign Out"
            onClick={handleSignout}
          />
        </Navbar>
      }
      header={
        <Header height={60} p="xs">
          <Text size="xl">{/* Header content */}Chipotle</Text>
        </Header>
      }
    >
      <>
        {whatToShow === "Current Orders User" && <CurrentOrders />}
        {whatToShow === "Menu" && <Menu setWhatToShow={setWhatToShow} />}
        {whatToShow === "Past Orders" && <Pastorders />}
      </>
    </AppShell>
  );
}

export default Dashboard;
