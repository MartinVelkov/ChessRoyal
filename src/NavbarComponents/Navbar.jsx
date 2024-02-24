import React from "react";

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
          <NavLink to="/signup">Направете акаунт</NavLink>
        </li>
        <li>
          <NavLink to="/login">Влезте в акаунт</NavLink>
        </li>
        <li>
          <NavLink to="/About">Статистики</NavLink>
        </li>
        <li>
          <NavLink to="/Chess">Шах</NavLink>
        </li>
        <li>
          <NavLink to="/Contact">Контакт</NavLink>
        </li>
      </ul>
    </nav>
  );
};
