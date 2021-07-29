import React, { Component } from "react";
import { NavLink } from "react-router-dom";

class Navbar extends Component {
  render() {
    return (
      <div className="navbar">
          <NavLink to="/analyse"> Analyse </NavLink>
          <NavLink to="/companies" activeclassName="active"> Companies</NavLink>
          <NavLink to="/exchanges"> Exchanges </NavLink>
          {  localStorage.getItem("role")=='[ROLE_ADMIN]' ?
          <NavLink to="/map"> Map Company-Exchange </NavLink>
          :""}
          <NavLink to="/ipos"> IPOs </NavLink>
          <NavLink to="/stocks"> Stocks </NavLink>
          <NavLink to="/sectors"> Sectors </NavLink>
      </div>
    );
  }
}

export default Navbar;
