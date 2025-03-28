import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import axios from "axios";
import Login from "./components/Login.jsx";
import UsersList from "./components/UserList.jsx";
import EditUser from "./components/EditUser.jsx";
import { ToastContainer, toast } from 'react-toastify';

function App() {
  const [token, setToken] = useState(localStorage.getItem("token") || "");

  const handleLogin = async (email, password) => {
    try {
      const response = await axios.post("https://reqres.in/api/login", { email, password });
      localStorage.setItem("token", response.data.token);
      setToken(response.data.token);
    } catch (error) {
      alert("Invalid credentials");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken("");
  };

  return (
    <>
    <ToastContainer />
    <Router>
      <Routes>
        <Route path="/" element={token ? <Navigate to="/users" /> : <Login onLogin={handleLogin} />} />
        <Route path="/users" element={token ? <UsersList onLogout={handleLogout} /> : <Navigate to="/" />} />
        <Route path="/edit/:id" element={token ? <EditUser /> : <Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
