import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { Home } from "./Home";
import { Register } from "./Register";
import { Login } from "./Login";
import { Clock } from "./Clock";

//---Ways-to-the-backend:
//-OSPanel:   http://NY2025/backend/
//-Plesk:     https://97108289.hetictlyceum.nl/NY_2025/backend/

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/clock" element={<Clock />} />
      </Routes>
    </Router>
  );
}

export default App;
