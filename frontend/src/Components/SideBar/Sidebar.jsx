import React from "react";

import "./sidebar.css";
// import thu vien
import { FcLandscape } from "react-icons/fc";
import { FcHome } from "react-icons/fc";
import { FcDepartment } from "react-icons/fc";
import { FcShipped } from "react-icons/fc";
import { FcPortraitMode } from "react-icons/fc";
import { FcComboChart } from "react-icons/fc";
import { FcCurrencyExchange } from "react-icons/fc";
import { FcPaid } from "react-icons/fc";
import { FcInspection } from "react-icons/fc";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

function Sidebar() {
  return (
    <aside id="sidebar">
      <div className="sidebar-title">
        <div className="sidebar-brand">
          <FcLandscape className="icon_header" /> MARINA
        </div>
      </div>
      <ul className="sidebar-list">
        <li className="sidebar-list-item">
          <Link to="/">
            <FcHome className="icon-Home" /> Trang chủ
          </Link>
        </li>
        <li className="sidebar-list-item">
          <Link to="/hotel">
            <FcDepartment className="icon-Hotel" /> Phòng
          </Link>
        </li>
        <li className="sidebar-list-item">
          <Link to="/booking">
            <FcShipped className="icon-Categories" />
            Đơn đặt phòng
          </Link>
        </li>
        <li className="sidebar-list-item">
          <Link to="/Service">
            <FcComboChart className="icon-reports" />
            Dịch vụ
          </Link>
        </li>
        <li className="sidebar-list-item">
          <Link to="/account">
            <FcPortraitMode className="icon-Account" /> Tài khoản
          </Link>
        </li>
        <li className="sidebar-list-item">
          <Link to="/bookingservice">
            <FcPaid className="icon-Account" /> Đặt dịch vụ
          </Link>
        </li>
        <li className="sidebar-list-item">
          <Link to="/revenue">
            <FcCurrencyExchange className="icon-Account" /> Doanh Thu
          </Link>
        </li>
        <li className="sidebar-list-item">
          <Link to="/report">
            <FcInspection className="icon-Account" /> Báo cáo
          </Link>
        </li>
      </ul>
    </aside>
  );
}

export default Sidebar;
