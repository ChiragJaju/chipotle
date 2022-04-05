import StudentDashboard from "./layout/StudentDashboard";
import AdminDashboard from "./layout/AdminDashBoard";
import AuthContext from "./context/AuthContext";
import { useState, useContext } from "react";
function App() {
  const { user } = useContext(AuthContext);
  return (
    <>{user.name === "admin" ? <AdminDashboard /> : <StudentDashboard />}</>
  );
}

export default App;
