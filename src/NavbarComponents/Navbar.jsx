import React from "react";
import { Profile } from "./pages";
import { Link, NavLink } from "react-router-dom";

import "./Navbar.css";

export const Navbar = () => {
  return (
    <nav>
      <Link to="/About" className="title">
        Chess Royal
      </Link>
      <div className="menu"></div>
      <ul>
        <li>
          <NavLink to="/About">Статистики</NavLink>
        </li>
        <li>
          <NavLink to="/Tutorial">Туториал</NavLink>
        </li>
        <li>
          <NavLink to="/Chess">Шах</NavLink>
        </li>
        <li>
          <NavLink to="/Contact">Контакт</NavLink>
        </li>
        <li id="Profile">
          {Profile()}
        </li>
      </ul>
    </nav>
  );
};
