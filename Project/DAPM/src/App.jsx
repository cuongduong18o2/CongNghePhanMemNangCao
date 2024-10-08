import { useState } from "react";
import "./App.css";
import Header from "./component/Header";
import Sidebar from "./Sidebar";
import Home from "./Home";
import Hotel_Management from "./pages/Hotel_Management";
import Categories from "./pages/Categories";
import Customer from "./pages/Customer";
import Account from "./pages/Account";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
function App() {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);
  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  return (
    <div className="grid-container">
      <Router>
        <Header OpenSidebar={OpenSidebar} />
        <Sidebar
          openSidebarToggle={openSidebarToggle}
          OpenSidebar={OpenSidebar}
        />
        <Routes>
          <Route exact path="/" element={<Home />} />

          <Route path="/hotel" element={<Hotel_Management />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/customer" element={<Customer />} />
          <Route path="/account" element={<Account />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
