import React from "react";
import { useState, useEffect } from "react";
import { Routes, Link, Route, Navigate, useNavigate } from "react-router-dom";

function PageNotFound() {
  return (
    <div className="page-not-found">
      <h3 className="page-not-found__title">
        <span>404</span> - Страница не найдена
      </h3>
      <p className="page-not-found__text">Ой, здесь ничего нет</p>
      <Link className="page-not-found__button" to="/">
        Назад
      </Link>
    </div>
  );
}

export default PageNotFound;
