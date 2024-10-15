import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "./LoginSignup.css";

const Login = () => {
  return (
    <div className="container">
      <div className="headerLogin">
        <h2 className="text">Đăng Nhập </h2>
        <div className="underline"></div>
      </div>
      <div className="inputs">
        <div className="input">
          {/* <img src={email_icon} alt="" /> */}
          <input type="email" placeholder="Email" />
        </div>
        <div className="input">
          {/* <img src={password_icon} alt="" /> */}
          <input type="password" placeholder="Mật khẩu" />
        </div>
      </div>
      <div className="submit-container">
        <div className="submit">Đăng Nhập</div>
      </div>
      <div className="selection">
        <Link to="/signup" className="create-account">
          <span>Tạo tài khoản</span>
        </Link>
        <Link to="/forgetpass" className="forgot-password">
          <span>Quên mật khẩu?</span>
        </Link>
      </div>

      <div className="underline2"></div>
      <div className="dieukhoan">
        <span>Tôi đồng ý với các</span>
        <a href="">
          <span> Điều khoản sử dụng</span>
        </a>
        <span> và</span>
        <a href="">
          <span> Chính sách bảo mật!</span>
        </a>
      </div>
    </div>
  );
};

export default Login;
