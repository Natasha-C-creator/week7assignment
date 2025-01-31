import { useState } from "react";
import "./Footer.css";

export default function Footer(props) {
  const [showContent, setShowContent] = useState(false);
  function handleClick() {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setShowContent(!showContent);
  }
  return (
    <>
      <h4 onClick={handleClick}>
        {props.title}Wedding Guest Comments ❤️ Copyright NC 2025
      </h4>
      {showContent && <p>{props.content}</p>}
    </>
  );
}
