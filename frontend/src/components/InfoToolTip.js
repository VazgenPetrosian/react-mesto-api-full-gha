import React from "react";
import { useState, useEffect } from "react";
import { Routes, Link, Route, Navigate, useNavigate } from "react-router-dom";
import galochka from "../images/galochka.svg";
import error from "../images/error.svg";
import { usePopupClose } from "../hooks/usePopupClose";

function InfoToolTip({ isOpen, onClose, succes, fail, isRegistered }) {
  const navigate = useNavigate();
  usePopupClose(isOpen, onClose);
  function closePopup() {
    if (isRegistered) {
      navigate("/sign-in", { replace: true });
    }
    onClose();
  }

  return (
    <div className={`popup  ${isOpen ? "popup_opened" : ""}`} onClick={onClose}>
      <div
        className="popup__container popup__container_type_infoToolTip"
        onClick={(evt) => evt.stopPropagation()}
      >
        <button
          type="button"
          className="popup__close"
          onClick={closePopup}
        ></button>
        <img
          src={isRegistered ? `${galochka}` : `${error}`}
          alt="удачно или ошибка"
        />
        <h2 className="popup__heading popup__heading_type_infoToolTip">
          {isRegistered ? `${succes}` : `${fail}`}
        </h2>
      </div>
    </div>
  );
}
export default InfoToolTip;
