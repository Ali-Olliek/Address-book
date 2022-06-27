import React from 'react'
import Dashboard from "../components/Dashboard";
import Contacts from "./Contacts"
import CreateContact from "./CreateContact"
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";

export default function Main() {

  return (
    <>
      <Dashboard />
      <Contacts />
    </>
  );
}
