import React from "react";
import closeButton from "../images/close-icon-320px.svg";
import { usePopupClose } from "../hooks/usePopupClose";

function ImagePopup(props) {
  usePopupClose(props.card?.link, props.onClose);
  return (
    <div
      className={`popup popup_type_zoom ${
        props.card.link ? "popup_opened" : ""
      }`}
      id={props.card._id}
    >
      <div className="popup__zoom-container">
        <button
          type="button"
          onClick={props.onClose}
          className="popup__close popup__close_type_zoom"
          style={{ backgroundImage: `url(${closeButton})` }}
        ></button>
        <img
          className="popup__zoom-image"
          src={props.card.link}
          alt={props.card.name}
        />
        <p className="popup__zoom-caption">{props.card.name}</p>
      </div>
    </div>
  );
}
export default ImagePopup;
