import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Header from "./components/Header.jsx";
import Form from "./components/Form.jsx";
import Comments from "./components/Comments.jsx";
import Footer from "./components/Footer.jsx";

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Form />
        <Routes>
          <Route path="/components/:comments" element={<Comments />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}
