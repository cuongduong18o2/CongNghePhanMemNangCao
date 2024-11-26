import React from "react";
import { PureComponent } from "react";
import "./home.css";
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
  ZAxis,
  ScatterChart,
  Scatter,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";

const colors = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "red", "pink"];
const HomePage = () => {
  const data01 = [
    { x: 10, y: 30 },
    { x: 30, y: 200 },
    { x: 45, y: 100 },
    { x: 50, y: 400 },
    { x: 70, y: 150 },
    { x: 100, y: 250 },
  ];
  const data02 = [
    { x: 30, y: 20 },
    { x: 50, y: 180 },
    { x: 75, y: 240 },
    { x: 100, y: 100 },
    { x: 120, y: 190 },
  ];

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

  const getPath = (x, y, width, height) => {
    return `M${x},${y + height}C${x + width / 3},${y + height} ${
      x + width / 2
    },${y + height / 3}
    ${x + width / 2}, ${y}
    C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} ${
      x + width
    }, ${y + height}
    Z`;
  };

  const TriangleBar = (props) => {
    const { fill, x, y, width, height } = props;

    return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
  };

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
        <BarChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Bar
            dataKey="uv"
            fill="#8884d8"
            shape={<TriangleBar />}
            label={{ position: "top" }}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={colors[index % 20]} />
            ))}
          </Bar>
        </BarChart>
        <ResponsiveContainer width="100%" height={340}>
          <ScatterChart
            margin={{
              top: 20,
              right: 20,
              bottom: 20,
              left: 20,
            }}
          >
            <CartesianGrid />
            <XAxis type="number" dataKey="x" name="stature" unit="" />
            <YAxis type="number" dataKey="y" name="weight" unit="" />
            <ZAxis type="number" range={[100]} />
            <Tooltip cursor={{ strokeDasharray: "3 3" }} />
            <Legend />
            <Scatter
              name="A Service"
              data={data01}
              fill="#8884d8"
              line
              shape="cross"
            />
            <Scatter
              name="B Room"
              data={data02}
              fill="#82ca9d"
              line
              shape="diamond"
            />
          </ScatterChart>
        </ResponsiveContainer>
      </div>
    </main>
  );
};

export default HomePage;
