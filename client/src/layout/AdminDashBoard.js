import { AppShell, Navbar, Header, Text } from "@mantine/core";
import { useState, useContext } from "react";
import AuthContext from "../context/AuthContext";
import { Menu2, ClipboardList, Logout, ListCheck } from "tabler-icons-react";
import SidebarButton from "../components/sidebarButton";
import CurrentOrders from "../pages/Admin/Current Orders";
import CustomizeMenu from "../pages/Admin/Custormize Menu";
import Pastorders from "../pages/Admin/Pastorders";

function Dashboard() {
  const { whatToShow, setWhatToShow, setUser } = useContext(AuthContext);

  const handleMenuClick = () => {
    setWhatToShow("Menu");
  };
  const handlePastOrdersClick = () => {
    setWhatToShow("Past Orders");
  };
  const handleCurrentOrdersClick = () => {
    setWhatToShow("Current Orders Admin");
  };
  const handleSignout = () => {
    setUser({ name: "none" });
  };

  return (
    <AppShell
      padding="md"
      navbar={
        <Navbar width={{ base: 300 }} height={500} p="xs">
          <SidebarButton
            icon={<Menu2 size={25} />}
            color="violet"
            label="Current Orders"
            onClick={handleCurrentOrdersClick}
          />
          <SidebarButton
            icon={<ClipboardList size={25} />}
            color="blue"
            label="Customize Menu"
            onClick={handleMenuClick}
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
        {whatToShow === "Current Orders Admin" && <CurrentOrders />}
        {whatToShow === "Menu" && <CustomizeMenu />}
        {whatToShow === "Past Orders" && <Pastorders />}
      </>
    </AppShell>
  );
}

export default Dashboard;
