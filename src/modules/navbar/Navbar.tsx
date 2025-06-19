import { Link } from "react-router-dom";

import "./Navbar.css";
const Navbar = () => {
  return (
    <nav className="navbar">
      <ul className="nav-list">
        {" "}
        <Link to="/games/activity" className="nav-item">
          <li className="nav-item-list">
            <span className="nav-link">Lokacije dogajanja</span>
          </li>
        </Link>
        <Link to="/games/bag" className="nav-item">
          <li className="nav-item-list">
            <span className="nav-link">Pakiraj nahrbtnik</span>
          </li>
        </Link>
        <Link to="/games/camp" className="nav-item">
          <li className="nav-item-list">
            <span className="nav-link">Sestavi tabor</span>
          </li>
        </Link>
      </ul>
    </nav>
  );
};

export default Navbar;
