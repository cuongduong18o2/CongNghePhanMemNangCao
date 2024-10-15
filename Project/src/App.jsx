import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./component/Header";
import Sidebar from "./Sidebar";
import Home from "./Home";
import Hotel_Management from "./pages/Hotel_Management";
import Categories from "./pages/Categories";
import Customer from "./pages/Customer";
import Account from "./pages/Account";
import Login from "./component/login";
import Signup from "./component/signup";

// Main layout with Header and Sidebar
const MainLayout = ({ children, OpenSidebar, openSidebarToggle }) => {
  return (
    <div className="grid-container">
      <Header OpenSidebar={OpenSidebar} />
      <Sidebar
        openSidebarToggle={openSidebarToggle}
        OpenSidebar={OpenSidebar}
      />
      {children}
    </div>
  );
};

const BlankLayout = ({ children }) => {
  return <div className="blank-layout">{children}</div>;
};

function App() {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  return (
    <Router>
      <Routes>
        {/* Pages with Header and Sidebar */}
        <Route
          path="/"
          element={
            <MainLayout
              openSidebarToggle={openSidebarToggle}
              OpenSidebar={OpenSidebar}
            >
              <Home />
            </MainLayout>
          }
        />
        <Route
          path="/hotel"
          element={
            <MainLayout
              openSidebarToggle={openSidebarToggle}
              OpenSidebar={OpenSidebar}
            >
              <Hotel_Management />
            </MainLayout>
          }
        />
        <Route
          path="/categories"
          element={
            <MainLayout
              openSidebarToggle={openSidebarToggle}
              OpenSidebar={OpenSidebar}
            >
              <Categories />
            </MainLayout>
          }
        />
        <Route
          path="/customer"
          element={
            <MainLayout
              openSidebarToggle={openSidebarToggle}
              OpenSidebar={OpenSidebar}
            >
              <Customer />
            </MainLayout>
          }
        />
        <Route
          path="/account"
          element={
            <MainLayout
              openSidebarToggle={openSidebarToggle}
              OpenSidebar={OpenSidebar}
            >
              <Account />
            </MainLayout>
          }
        />

        {/* Page without Header and Sidebar (Login page) */}
        <Route
          path="/login"
          element={
            <BlankLayout>
              <Login />
            </BlankLayout>
          }
        />
        <Route
          path="/signup"
          element={
            <BlankLayout>
              <Signup />
            </BlankLayout>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
