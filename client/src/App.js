import StudentDashboard from "./layout/StudentDashboard";
import AdminDashboard from "./layout/AdminDashBoard";
import AuthContext from "./context/AuthContext";
import { useState, useContext } from "react";
import Login from "./pages/login";
import AdminCard from "./components/Menu Card/AdminCard";
import CurrentOrders from "./pages/Admin/Current Orders";
import Menu from "./pages/User/Menu";

function App() {
  const { user } = useContext(AuthContext);
  // console.log(user);
  return (
    // <>{user.name === "admin" ? <AdminDashboard /> : <StudentDashboard />}</>
    <>
      {user.name === "none" && <Login />}
      {user.name === "admin" && <AdminDashboard />}
      {user.name === "student" && <StudentDashboard />}

      
    </>
  );
}

export default App;
