import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Header";
import Dashboard from "./pages/dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PrivateRoute from "./privateRoute";


function App() {


  return (
    <>
      <Router>
        <div className="App bg-purple-200 pb-2" style = {{height:"max-content"}}>
          <Header />
          <Routes>
            <Route path="/" element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            } />  
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}
export default App;
