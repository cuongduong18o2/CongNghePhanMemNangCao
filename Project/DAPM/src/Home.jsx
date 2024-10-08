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

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";
// import recharts

import {
  BarChart,
  Bar,
  Rectangle,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
function Home() {
  const data = [
    {
      name: "2017",
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: "2018",
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: "2019",
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: "2020",
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: "2021",
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: "2022",
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: "2023",
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
  ];

  //coding chỗ này nè
  return (
    <main className="main-container">
      <div className="main-title">
        <h3>DASHBOARD</h3>
      </div>

      <div className="main-cards">
        {/* 1  */}
        <div className="card">
          <div className="card-inner">
            <h3>HOTEL</h3>
            <FaHotel className="card_icon" />
          </div>
          <h1>300</h1>
        </div>
        {/* 2 */}
        <div className="card">
          <div className="card-inner">
            <h3>CATEGORIES</h3>
            <BsFillGrid3X3GapFill className="card_icon" />
          </div>
          <h1>120</h1>
        </div>
        {/* 3 */}
        <div className="card">
          <div className="card-inner">
            <h3>CUSTOMER</h3>
            <BsPeopleFill className="card_icon" />
          </div>
          <h1>182</h1>
        </div>
        {/* 4 */}
        <div className="card">
          <div className="card-inner">
            <h3>ACCOUNT</h3>
            <MdAccountCircle className="card_icon" />
          </div>
          <h1>20</h1>
        </div>
      </div>

      <div className="charts">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            width={500}
            height={300}
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="pv"
              stroke="#8884d8"
              activeDot={{ r: 8 }}
            />
            <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
          </LineChart>
        </ResponsiveContainer>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            width={500}
            height={300}
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar
              dataKey="pv"
              fill="#8884d8"
              activeBar={<Rectangle fill="pink" stroke="blue" />}
            />
            <Bar
              dataKey="uv"
              fill="#82ca9d"
              activeBar={<Rectangle fill="gold" stroke="purple" />}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </main>
  );
}

export default Home;
