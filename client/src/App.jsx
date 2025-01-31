import "./App.css";
import { useState } from "react";
import Header from "./components/Header.jsx";
import Form from "./components/Form.jsx";
import Comments from "./components/Comments.jsx";
import Footer from "./components/Footer.jsx";

export default function App() {
  return (
    <>
      <Header />
      <Form />
      <Comments />
      <Footer />
    </>
  );
}
