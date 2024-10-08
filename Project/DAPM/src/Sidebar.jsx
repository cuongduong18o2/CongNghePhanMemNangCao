import React from "react";
import {
  BsCart3,
  BsGrid1X2Fill,
  BsFillArchiveFill,
  BsFillGrid3X3GapFill,
  BsPeopleFill,
  BsListCheck,
  BsMenuButtonWideFill,
  BsFillGearFill,
  BsGearFill,
} from "react-icons/bs";
// import thu vien
import { GiShop } from "react-icons/gi";
import { FaHotel } from "react-icons/fa6";
import { MdAccountCircle } from "react-icons/md";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Hotel_Management from "./pages/Hotel_Management";
import Categories from "./pages/Categories";
import Customer from "./pages/Customer";
import Account from "./pages/Account";
import Home from "./Home"; // Nhập Home

function Sidebar({ openSidebarToggle, OpenSidebar }) {
  //change page hehe

  //code

  return (
    <aside
      id="sidebar"
      className={openSidebarToggle ? "sidebar-responsive" : ""}
    >
      <div className="sidebar-title">
        <div className="sidebar-brand">
          <GiShop className="icon_header" /> AGODA
        </div>
        <span className="icon close_icon " onClick={OpenSidebar}>
          X
        </span>
      </div>
      <ul className="sidebar-list">
        <li className="sidebar-list-item">
          <Link to="/">
            <BsGrid1X2Fill className="icon" /> Home
          </Link>
        </li>
        <li className="sidebar-list-item">
          <Link to="/hotel">
            <FaHotel className="icon" /> Hotel
          </Link>
        </li>
        <li className="sidebar-list-item">
          <Link to="/categories">
            <BsFillGrid3X3GapFill className="icon" /> Categories
          </Link>
        </li>
        <li className="sidebar-list-item">
          <Link to="/customer">
            <BsPeopleFill className="icon" /> Customer
          </Link>
        </li>
        <li className="sidebar-list-item">
          <Link to="/account">
            <MdAccountCircle className="icon" /> Account
          </Link>
        </li>
        <li className="sidebar-list-item">
          <Link to="/report">
            <BsMenuButtonWideFill className="icon" /> Report
          </Link>
        </li>
        <li className="sidebar-list-item">
          <Link to="/setting">
            <BsGearFill className="icon" /> Setting
          </Link>
        </li>
      </ul>
    </aside>
  );
}

export default Sidebar;
