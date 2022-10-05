import React from "react";
import { capitalize, isEmpty } from "lodash";
import SearchBar from "../SearchBar";

function Header() {
  return (
    <header id="header" className="header-container">
      <div className="header-content">
        <div className="header-content-left">
          <div className="header-logo">
            <a href="https://www.thrillophilia.com" className="header-logo-img">
              <img src="/images/thrillo-logos.png" alt="header-logo" />
            </a>
          </div>
          <div className="search-bar">
            <SearchBar />
          </div>
        </div>
        <div className="header-content-right">
          <div className="currency-picker"></div>
          <div className="user-tab">
            <div className="user-avatar"></div>
            <div className="user-name">Hi, Omkar</div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
