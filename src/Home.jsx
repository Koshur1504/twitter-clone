import React from "react";

import "./App.css";
import Feed from "./Feed";

import Sidebar from "./Sidebar";
import Widgets from "./Widgets.jsx";

const Home = () => {
  return (
    <>
      <Sidebar />
      <Feed />
      <Widgets />
    </>
  );
};

export default Home;
