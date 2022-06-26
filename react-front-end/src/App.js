import React from 'react';
import Login from "./pages/Login";
import SignUp from "./pages/Signup";
import Main from "./pages/Main"


import { BrowserRouter as Router, Routes, Route } from "react-router-dom";



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/SignUp" element={<SignUp />}></Route>
        <Route path="/Main" element={<Main />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
