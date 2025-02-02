import "./Header.css";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/add-comment">Add Comment</Link>
        </li>
        <li>
          <Link to="/comments">View Comments</Link>
        </li>
      </ul>
      <h2 className="header">Wedding Guest Comments ❤️ </h2>
    </nav>
  );
}
