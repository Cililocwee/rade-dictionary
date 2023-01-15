import React from "react";
import { Link } from "react-router-dom";
import "./navbar.css";

export default function Navbar() {
  return (
    <div id="navbar">
      <Link to="/">
        <li>Home</li>
      </Link>

      <Link to="/dictionary">
        <li>Dictionary</li>
      </Link>

      <Link to="/about">
        <li>About</li>
      </Link>

      <Link to="/contact">
        <li>Contact</li>
      </Link>
    </div>
  );
}
