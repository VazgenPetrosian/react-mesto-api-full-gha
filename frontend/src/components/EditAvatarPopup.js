import React from "react";
import { useState, useEffect, useContext, useRef } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import PopupWithForm from "../components/PopupWithForm";
function EditAvatarPopup(props) {
  const avatarRef = useRef("");

  function handleSubmit(e) {
    e.preventDefault();

    props.onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
    console.log(avatarRef.current.value);
  }
  return (
    <PopupWithForm
      isOpen={props.isOpen}
      onClose={props.onClose}
      title="Обновить аватар"
      id={"_avatar"}
      buttonName={props.isLoading ? "Сохранение..." : "Сохранить"}
      onSubmit={handleSubmit}
    >
      <input
        ref={avatarRef}
        name="description"
        placeholder="Ссылка на аватар"
        type="url"
        className="popup__input popup__input_select_url"
        required
        id="avatar-value"
      />
      <span className="popup__input-error avatar-value-input-error"></span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
