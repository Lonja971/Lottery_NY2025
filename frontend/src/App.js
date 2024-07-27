import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { Home } from "./Home";
import { Register } from "./Register";
import { Login } from "./Login";
import { ChangeName } from "./Change-name";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/change-name" element={<ChangeName />} />
      </Routes>
    </Router>
  );
}

export default App;
