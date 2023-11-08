import React from "react";
import { Link } from "react-router-dom";
import useFormAndValidation from "../hooks/useFormAndValidation";

const Login = (props) => {
  const { values, handleChange, errors, isValid, resetForm } = useFormAndValidation();
  const { email, password } = values;

  const handleSubmit = (evt) => {
    evt.preventDefault();
    props.onLogin({ email, password });
    resetForm();
  };

  return (
    <div className="auth">
      <h2 className="auth__title">Вход</h2>
      <form className="auth__form" onSubmit={handleSubmit}>
        <input
          type="email"
          className="auth__input"
          required
          minLength="8"
          maxLength="40"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          value={values.email || ""}
        ></input>
        <span className="auth__input-error auth-error"></span>
        <input
          type="password"
          className="auth__input"
          name="password"
          placeholder="Пароль"
          required
          minLength="2"
          maxLength="30"
          onChange={handleChange}
          value={values.password || ""}
        ></input>
        <span className="auth__input-error auth-error"></span>
        <button type="submit" className="auth__button">
          Войти
        </button>
      </form>
    </div>
  );
}

export default Login;
