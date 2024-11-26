import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./navbar.css";
import { logOut } from "../../redux/apiRequest";
import axios from "axios";

const NavBar = () => {
  const user = useSelector((state) => state.auth.login.currentUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const accessToken = user?.AccessToken;
  const id = user?._id;

  const handleLogOut = () => {
    logOut(dispatch, id, accessToken, navigate);
  };

  return (
    <nav className="navbar-container">
      {user ? (
        <>
          <p className="navbar-user">
            Hi, <span>{user.name}</span>
          </p>
          <Link to="/logout" className="navbar-logout" onClick={handleLogOut}>
            Đăng xuất
          </Link>
        </>
      ) : (
        <>
          <Link to="/login" className="navbar-login">
            Đăng nhập
          </Link>
          <Link to="/register" className="navbar-register">
            Đăng ký
          </Link>
        </>
      )}
    </nav>
  );
};

export default NavBar;
