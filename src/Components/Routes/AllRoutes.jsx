import React from "react";
import { Routes, Route } from "react-router-dom";
import CoinsPage from "../Pages/CoinsPage";
import HomePage from "../Pages/HomePage";

const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />}></Route>
      <Route path="/coins/:id" element={<CoinsPage />}></Route>
    </Routes>
  );
};

export default AllRoutes;
