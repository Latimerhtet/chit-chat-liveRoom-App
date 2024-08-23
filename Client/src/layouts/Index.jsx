import React from "react";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";

const Index = () => {
  return (
    <section>
      <Navbar />
      <Outlet />
    </section>
  );
};

export default Index;
