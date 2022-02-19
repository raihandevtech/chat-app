import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Registration from "./pages/registration/Registration";
import Login from "./pages/login/Login";
import Message from "./pages/message/Message";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";

function App() {
  const { user } = useContext(AuthContext);

  return (
    <Routes>
      <Route
        path="/"
        element={user ? <Message /> : <Navigate to="/registration" />}
      />
      <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
      <Route
        path="/registration"
        element={!user ? <Registration /> : <Navigate to="/" />}
      />
    </Routes>
  );
}

export default App;
