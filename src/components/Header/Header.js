import React from "react";
import "./Header.css";

class Header extends React.Component {
  render() {
    return (
      <header className="header">
        <div className="container">
          <nav className="nav">
            <ul className="menu">
              <li className="menu__item">
                <a href="./" className="menu__link">
                  home
                </a>
              </li>
              <li className="menu__item">
                <a href="./" className="menu__link">
                  about me
                </a>
              </li>
              <li className="menu__item">
                <a href="./" className="menu__link">
                  contact me
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </header>
    );
  }
}

export default Header;
