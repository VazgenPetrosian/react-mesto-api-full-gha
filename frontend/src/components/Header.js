import logo from "../images/logo.svg";
import React from "react";
import {
  Routes,
  Link,
  Route,
  Navigate,
  useNavigate,
  useLocation,
} from "react-router-dom";

function Header({ isLoggedIn, email, onSignOut }) {
  const location = useLocation();
  return (
    <header className="header">
      <img className="logo" src={logo} alt="Лого" />
      <div className="header__container">
        {location.pathname === "/" && isLoggedIn === true && (
          <p className="header__email header__email">{email}</p>
        )}
        {location.pathname === "/" && isLoggedIn === true && (
          <Link to="/sign-in" className="header__quit" onClick={onSignOut}>
            Выйти
          </Link>
        )}
        {location.pathname === "/sign-in" && (
          <Link to="/sign-up" className="header__quit">
            Регистрация
          </Link>
        )}
        {location.pathname === "/sign-up" && (
          <Link to="/sign-in" className="header__quit">
            Войти
          </Link>
        )}
      </div>
    </header>
  );
}

export default Header;
