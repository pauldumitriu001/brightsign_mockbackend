import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import AddOrder from "./pages/AddOrder";
import EditOrder from "./pages/EditOrder";

export default function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route index path="/" element={<Home />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/NewOrder" element={<AddOrder />} />
          <Route path="/:deviceId/orders/:orderId" element={<EditOrder />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
