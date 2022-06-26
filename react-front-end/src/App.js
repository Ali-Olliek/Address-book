import React from 'react';
import Login from "./pages/Login";
import SignUp from "./pages/Signup";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/SignUp" element={<SignUp />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
