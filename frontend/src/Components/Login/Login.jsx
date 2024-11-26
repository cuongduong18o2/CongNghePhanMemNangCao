import "./login.css";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../../redux/apiRequest";
import { useDispatch, useSelector } from "react-redux"; // Thêm useSelector để lấy thông tin từ store

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const msg = useSelector((state) => state.auth.msg);

  const handleLogin = (e) => {
    e.preventDefault();

    const newUser = {
      name: username,
      password: password,
    };
    loginUser(newUser, dispatch, navigate);
  };

  return (
    <section className="login-container">
      <div className="login-title">Đăng nhập</div>
      <form onSubmit={handleLogin}>
        <label>Tên đăng nhập</label>
        <div className="input-icon-container">
          <i className="icon">🔑</i>
          <input
            type="text"
            placeholder="Enter your username"
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <label>Mật khẩu</label>
        <div className="input-icon-container">
          <i className="icon">🔒</i>
          <input
            type="password"
            placeholder="Enter your password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Đăng nhập</button>

        {/* Hiển thị thông báo lỗi */}
        <div className="msgLogin" style={{ color: "red" }}>
          {msg}
        </div>
      </form>
      <div className="login-register">Bạn chưa có tài khoản ?</div>

      <Link
        className="login-register-link"
        to="/register"
        style={{ color: "blue" }}
      >
        Đăng ký ngay{" "}
      </Link>
    </section>
  );
};

export default Login;
