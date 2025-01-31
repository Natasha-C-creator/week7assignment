import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Header from "./components/Header.jsx";
import CreateUserForm from "./components/CreateUserForm.jsx";
import Form from "./components/Form.jsx";
import Comments from "./components/Comments.jsx";
import Footer from "./components/Footer.jsx";

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <CreateUserForm />
        <Routes>
          <Route path="/components/:Form" element={<Form />} />
          <Route path="/components/:Comments" element={<Comments />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}
