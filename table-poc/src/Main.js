import React from "react";
import { Routes, Route, Outlet, Link } from "react-router-dom";
import Home from "./Components/Home";
import Table from "./Components/Table";

const Main = () => (
  <main>
    <Routes>
        <Route index element={<Home />} />
        <Route path='/table' element={<Table />} />
    </Routes>
  </main>
);

export default Main;
