import React from "react";
import closeButton from "../images/close-icon-320px.svg";
import { usePopupClose } from "../hooks/usePopupClose";

function PopupWithForm({
  isOpen,
  onClose,
  name,
  title,
  buttonName,
  children,
  id,
  onSubmit,
}) {
  usePopupClose(isOpen, onClose);
  return (
    <div className={`popup ${isOpen ? "popup_opened" : ""}`} id={id}>
      <div className="popup__container">
        <button
          style={{ backgroundImage: `url(${closeButton})` }}
          onClick={onClose}
          className="popup__close"
          type="button"
        ></button>
        <form onSubmit={onSubmit} className="popup__form" name={name}>
          <h2 className="popup__heading">{title}</h2>
          {children}
          <button className="popup__button" type="submit">
            {buttonName}
          </button>
        </form>
      </div>
    </div>
  );
}
export default PopupWithForm;
