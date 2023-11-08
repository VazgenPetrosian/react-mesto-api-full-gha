import React from "react";
import { useState, useEffect, useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import PopupWithForm from "../components/PopupWithForm";
import { AppContext } from "../contexts/AppContext";
function EditProfilePopup(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const editAppContext = React.useContext(AppContext);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeDescription(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();

    // Передаём значения управляемых компонентов во внешний обработчик
    props.onUpdateUser({
      name: name,
      about: description,
    });
  }
  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, props.onUpdateUser]);
  return (
    <PopupWithForm
      isOpen={props.isOpen}
      onClose={editAppContext.closeAllPopups}
      onSubmit={handleSubmit}
      title="Редактировать профиль"
      id={"_edit-profile"}
      buttonName={editAppContext.isLoading ? "Сохранение..." : "Сохранить"}
      isLoading={editAppContext.isLoading}
    >
      <input
        minLength="2"
        maxLength="40"
        required
        type="text"
        className="popup__input popup__input_select_name"
        name="name"
        id="name-value"
        placeholder="Название"
        onChange={handleChangeName}
        value={name || ""}
      />
      <span className="popup__input-error name-value-input-error"></span>
      <input
        minLength="2"
        maxLength="200"
        required
        type="text"
        className="popup__input popup__input_select_description"
        name="description"
        id="description-value"
        placeholder="О себе"
        onChange={handleChangeDescription}
        value={description || ""}
      />
      <span className="popup__input-error description-value-input-error"></span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
