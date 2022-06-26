import React from 'react'
import Dashboard from "../components/Dashboard";
import Contacts from "./Contacts"
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";

export default function Main() {
  return (
    <>
      <Dashboard />
      <Contacts />
    </>
  );
}
