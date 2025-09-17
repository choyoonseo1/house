import "./App.css";
import { useState } from "react";
import { Routes, Route } from "react-router-dom";

import AppNavBar from "./AppNavBar";  // 폴더(index.jsx) 자동 인식
import Home from "./Home";            // 폴더(index.jsx) 자동 인식
import data from "./data/data";       

import Login from "./Login";
import SignUp from "./signup";

export default function App() {
  const [items] = useState(data);

  return (
    <>
      <AppNavBar />
      <Routes>
        {/* 메인 */}
        <Route path="/" element={<Home items={items} />} />
        <Route path="/main" element={<Home items={items} />} />

        {/* 로그인/회원가입 */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />

        {/* 404 */}
        <Route path="*" element={<div style={{ padding: 24 }}>Page Not Found</div>} />
      </Routes>
    </>
  );
}
