import React from "react";
import {
  BsFillBellFill,
  BsFillEnvelopeFill,
  BsPersonCircle,
  BsSearch,
  BsJustify,
} from "react-icons/bs";
import { GiShop } from "react-icons/gi";
import { FaHotel } from "react-icons/fa6";
import { MdAccountCircle } from "react-icons/md";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

function Header({ OpenSidebar }) {
  return (
    <header className="header">
      <div className="menu-icon">
        <BsJustify className="icon" onClick={OpenSidebar} />
      </div>
      <div className="header-left">
        <BsSearch className="icon" />
      </div>
      <div className="header-right">
        <BsFillBellFill className="icon" />

        <BsFillEnvelopeFill className="icon" />
        <Link to="/login">
          <BsPersonCircle className="icon" />
        </Link>
      </div>
    </header>
  );
}

export default Header;
