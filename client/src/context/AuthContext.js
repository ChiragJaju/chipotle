import React, { useState, createContext } from "react";

const AuthContext = createContext();

function AuthContextProvider(props) {
  // Create useStates here and insert them in value, import AuthContext and extract them from there.

  const [dark, setDark] = useState(true);
  const [whatToShow, setWhatToShow] = useState("Menu");
  const [user, setUser] = useState({ name: "student" });
  return (
    <AuthContext.Provider
      value={{
        dark,
        setDark,
        whatToShow,
        setWhatToShow,
        user,
        setUser,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}
export default AuthContext;
export { AuthContextProvider };
