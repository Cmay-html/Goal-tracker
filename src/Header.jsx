import React from "react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="Header">
      <h1> SMART GOAL PLANNER </h1>
      <nav>
        <Link to="/">Home</Link> |{" "}
        <Link to="/add-goal">Add Goal</Link> |{" "}
        <Link to="/deposit">Deposit</Link> |{" "}
        <Link to="/overview">Overview</Link>
      </nav>
    </header>
  );
}

export default Header;