import { AppShell, Navbar, Header } from "@mantine/core";
import { useState, useContext } from "react";
import AuthContext from "../context/AuthContext";
import { Menu2, ClipboardList } from "tabler-icons-react";
import SidebarButton from "../components/sidebarButton";
import CurrentOrders from "../pages/Admin/Current Orders";
import CustomizeMenu from "../pages/Admin/Custormize Menu";

function Dashboard() {
  const { whatToShow, setWhatToShow } = useContext(AuthContext);

  function handleMenuClick() {
    setWhatToShow("Menu");
  }
  function handleCurrentOrdersClick() {
    setWhatToShow("Current Orders Admin");
  }

  return (
    <AppShell
      padding="md"
      navbar={
        <Navbar width={{ base: 300 }} height={500} p="xs">
          <SidebarButton
            icon={<Menu2 size={16} />}
            color="violet"
            label="Current Orders"
            onClick={handleCurrentOrdersClick}
          />
          <SidebarButton
            icon={<ClipboardList size={16} />}
            color="blue"
            label="Customize Menu"
            onClick={handleMenuClick}
          />
        </Navbar>
      }
      header={
        <Header height={60} p="xs">
          {/* Header content */}Chipotle
        </Header>
      }
      //   styles={(theme) => ({
      //     main: {
      //       backgroundColor:
      //         theme.colorScheme === "dark"
      //           ? theme.colors.dark[8]
      //           : theme.colors.gray[0],
      //     },
      //   })}
      // App here
    >
      <>
        {whatToShow === "Current Orders Admin" && <CurrentOrders />}
        {whatToShow === "Menu" && <CustomizeMenu />}
      </>
    </AppShell>
  );
}

export default Dashboard;