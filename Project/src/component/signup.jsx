import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "./LoginSignup.css";

const Signup = () => {
  return (
    <div className="container">
      <div className="headerLogin">
        <div className="text">Đăng Ký</div>
        <div className="underline"></div>
      </div>
      <div className="inputs">
        <div className="input">
          {/* <img src={user_icon} alt="" /> */}
          <input required type="text" placeholder="Họ và Tên" />
        </div>
        <div className="input">
          {/* <img src={email_icon} alt="" /> */}
          <input required type="email" placeholder="Email" />
        </div>
        <div className="input">
          {/* <img src={password_icon} alt="" /> */}
          <input required type="password" placeholder="Mật khẩu" />
        </div>
        <div className="input">
          {/* <img src={password_icon} alt="" /> */}
          <input required type="password" placeholder="Xác nhận mật khẩu" />
        </div>
      </div>
      <div className="submit-container">
        <button type="submit" className="submit">
          Đăng ký
        </button>
      </div>
      <div className="underline2"></div>
      <div className="submit-container">
        <a href="./login">
          <span className="login">Bạn đã có tài khoản? Đăng nhập.</span>
        </a>
      </div>
    </div>
  );
};

export default Signup;
