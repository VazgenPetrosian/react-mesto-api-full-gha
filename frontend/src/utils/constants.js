const initialCards = [
  {
    name: "Архыз",
    alt: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    alt: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    alt: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    alt: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    alt: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    alt: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];
const apiToken = {
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-65/",
  headers: {
    authorization: "ce55775e-6fe1-4bd4-a65b-e80c24fd297e",
    "Content-Type": "application/json",
  },
};

const formSubmitCard = document.forms["card-form"];
const buttonOpenPopupProfile = document.querySelector(".profile__edit-button");
const formEditProfile = document.forms["edit-form"];
const nameInput = document.querySelector(".popup__input_select_name");
const occupationInput = document.querySelector(
  ".popup__input_select_description"
);
const buttonOpenPopupAddCard = document.querySelector(".profile__add-button");
const cardsContainer = document.querySelector(".cards");
const buttonEditAvatarPic = document.querySelector(".profile__avatar-button");
export {
  initialCards,
  apiToken,
  formSubmitCard,
  buttonOpenPopupProfile,
  formEditProfile,
  nameInput,
  occupationInput,
  buttonOpenPopupAddCard,
  cardsContainer,
  buttonEditAvatarPic,
};
