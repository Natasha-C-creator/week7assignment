import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Header from "./components/Header.jsx";
import CreateUserForm from "./components/CreateUserForm.jsx";
import AddCommentForm from "./components/AddCommentForm.jsx";
import Comments from "./components/Comments.jsx";
import Footer from "./components/Footer.jsx";

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <CreateUserForm />
        <AddCommentForm />
        <Routes>
          <Route
            path="/components/:AddCommentForm"
            element={<AddCommentForm />}
          />
          <Route path="/components/:Comments" element={<Comments />} />
        </Routes>
        <Comments />
        <Footer />
      </BrowserRouter>
    </>
  );
}
