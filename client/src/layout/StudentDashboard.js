import { AppShell, Navbar, Header } from "@mantine/core";
import { useState, useContext } from "react";
import AuthContext from "../context/AuthContext";
import { Menu2, ClipboardList } from "tabler-icons-react";
import SidebarButton from "../components/sidebarButton";
import CurrentOrders from "../pages/User/Current Orders";
import Menu from "../pages/User/Menu";

function Dashboard() {
  const { whatToShow, setWhatToShow } = useContext(AuthContext);

  function handleMenuClick() {
    setWhatToShow("Menu");
  }
  function handleCurrentOrdersClick() {
    setWhatToShow("Current Orders User");
  }

  return (
    <AppShell
      padding="md"
      navbar={
        <Navbar width={{ base: 300 }} height={500} p="xs">
          <SidebarButton
            icon={<ClipboardList size={16} />}
            color="blue"
            label="Menu"
            onClick={handleMenuClick}
          />
          <SidebarButton
            icon={<Menu2 size={16} />}
            color="violet"
            label="Current Orders"
            onClick={handleCurrentOrdersClick}
          />
        </Navbar>
      }
      header={
        <Header height={60} p="xs">
          {/* Header content */}Chipotle
        </Header>
      }
    >
      <>
        {whatToShow === "Current Orders User" && <CurrentOrders />}
        {whatToShow === "Menu" && <Menu />}
      </>
    </AppShell>
  );
}

export default Dashboard;
