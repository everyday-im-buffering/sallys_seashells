import React, { useState } from "react";
import Sidebar from "../Sidebar";
import Navbar from "../Navbar";

const Menus = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
      <Sidebar isOpen={isOpen} toggle={toggle} />
      <Navbar toggle={toggle} />
    </>
  );
};

export default Menus;
