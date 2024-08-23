import { Typography } from "@mui/material";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import CodeIcon from "@mui/icons-material/Code";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
const Navbar = () => {
  const [darkMode, setDarkmode] = useState(false);
  return (
    <nav className="py-5 px-10 flex justify-center">
      <nav className="w-4/5 flex justify-between items-center">
        <Link to={"/"}>
          <p className="text-2xl font-bold">Chit-Chat.io</p>
        </Link>
        <div className="flex gap-9">
          <button>
            <CodeIcon />
          </button>
          {darkMode ? (
            <button
              className="transition-all duration-75"
              onClick={() => {
                setDarkmode(false);
              }}
            >
              <LightModeIcon />
            </button>
          ) : (
            <button
              className="transition-all duration-1000"
              onClick={() => {
                setDarkmode(true);
              }}
            >
              <DarkModeIcon />
            </button>
          )}
        </div>
      </nav>
    </nav>
  );
};

export default Navbar;
