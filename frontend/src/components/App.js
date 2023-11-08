import React from "react";
import { useState, useEffect } from "react";
import { Routes, Link, Route, Navigate, useNavigate } from "react-router-dom";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { AppContext } from "../contexts/AppContext";
import { usePopupClose } from "../hooks/usePopupClose";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import api from "../utils/api.js";
import * as auth from "../utils/auth";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import Login from "./Login";
import Register from "./Register";
import PageNotFound from "./PageNotFound";
import InfoToolTip from "./InfoToolTip";
import ProtectedRoute from "./ProtectedRoute";

function App() {
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isInfoToolTipPopupOpen, setIsInfoToolTipPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [cards, setCards] = useState([]);
  const [currentUser, setCurrentUser] = useState({});
  // const [deletedCard, setDeletedCard] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const [isRegistered, setIsRegistered] = useState(false);
  const [email, setEmail] = useState("");
 
  const tokenCheck = () => {
    const jwtToken = localStorage.getItem("jwtToken");
    if (jwtToken) {
      auth
        .checkToken(jwtToken)
        .then((res) => {
          if (res) {
            setIsLoggedIn(true);
            setEmail(res.email);
            navigate("/", { replace: true});
          }
        })
        .catch((error) => {
          localStorage.clear();
        });
    }
  };

  useEffect(() => {
    tokenCheck();
  }, [isLoggedIn]);

  useEffect(() => {
    const jwtToken = localStorage.getItem("jwtToken");
    if (isLoggedIn) {
      Promise.all([api.getUserData(jwtToken), api.getInitialCards(jwtToken)]).then(([userData, cardData]) => {
        setCurrentUser(userData);
        setCards(cardData);
      }).catch((error) => {
        console.error(`ошибка: ${error} - ${error.statusText}`);
        setIsInfoToolTipPopupOpen(true);
      })
    }
  }, [isLoggedIn]);


  function handleEditProfileClick() {
    setEditProfilePopupOpen(true);
  }
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }
  function handleCardClick(card) {
    setSelectedCard(card);
  }
  function handleUpdateUser({ name, about }) {
    setIsLoading(true);
    api
      .editProfileInfo({ name, about })
      .then((userData) => {
        setCurrentUser(userData.data);
        closeAllPopups();
      })
      .catch((error) => {
        console.error(`ошибка: ${error} - ${error.statusText}`);
      })
      .finally(() => setIsLoading(false));
  }

  function handleAvatarUpdate(avatarUrl) {
    setIsLoading(true);
    api
      .editUserAvatar(avatarUrl)
      .then((newAvatar) => {
        setCurrentUser(newAvatar.data);
        closeAllPopups();
      })
      .catch((error) => {
        console.error(`ошибка: ${error} - ${error.statusText}`);
      })
      .finally(() => setIsLoading(false));
  }

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some((user) => user === currentUser._id);
    // Отправляем запрос в API и получаем обновлённые данные карточки
    api
    .changeLikeCardStatus(card._id, isLiked)
    .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((error) => {
        console.error(`ошибка: ${error} - ${error.statusText}`);
      });
  }

  function handleDeleteCard(card) {
    api
    .deleteCard(card._id)
    .then(() => setCards((state) => state.filter((c) => c._id !== card._id)))
      .catch((error) => {
        // console.error(`ошибка: ${error} - ${error.statusText}`);
        console.log(error);
      })
      .finally(() => setIsLoading(false));
  }

  function handleAddPlaceSubmit({ name, link }) {
    setIsLoading(true);
    api
      .setNewCard({ name, link })
      .then((newCard) => {
        console.log(newCard);
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((error) => {
        console.error(`ошибка: ${error} - ${error.statusText}`);
      })
      .finally(() => setIsLoading(false));
  }

  // !!!!!!!РЕГИСТРАЦИЯ!!!!!!!
  // !!!!!!!РЕГИСТРАЦИЯ!!!!!!!
  // !!!!!!!РЕГИСТРАЦИЯ!!!!!!!

  const handleRegister = ({ email, password }) => {
    auth
      .register({ email, password })
      .then(() => {
        setIsRegistered(true);
        setIsInfoToolTipPopupOpen(true);
      })
      .catch((error) => {
        setIsRegistered(false);
        setIsInfoToolTipPopupOpen(false);
      });
  }


  // !!!!!!!РЕГИСТРАЦИЯ!!!!!!!
  // !!!!!!!РЕГИСТРАЦИЯ!!!!!!!
  // !!!!!!!РЕГИСТРАЦИЯ!!!!!!!

  // !!!!!!!!!логин!!!!!!!
  // !!!!!!!!!логин!!!!!!!
  // !!!!!!!!!логин!!!!!!!

  const handleLogin = ({email, password}) => {
    // setFetching(true);
    auth
      .login({ email, password})
      .then((res) => {
        localStorage.setItem("jwtToken", res.jwtToken);
        setEmail(email);
        setIsLoggedIn(true);
        navigate("/", { replace: true });
      })
      .catch((error) => {
        setIsInfoToolTipPopupOpen(true);
      });
  }
  // !!!!!!!!!логин!!!!!!!
  // !!!!!!!!!логин!!!!!!!
  // !!!!!!!!!логин!!!!!!!



  function closeAllPopups() {
    setEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard({});
    setIsInfoToolTipPopupOpen(false);
  }
  function handleEscClose(e) {
    if (e.key === "Escape") {
      closeAllPopups();
    }
  }
  function handleSignOut() {
    localStorage.removeItem("jwtToken");
    setIsLoggedIn(false);
    navigate("/sign-in", { replace: true });
  };

  return (
    <AppContext.Provider value={{ isLoading, closeAllPopups }}>
      <CurrentUserContext.Provider value={currentUser}>
        <div className="App">
          <div className="pages">
            <Header
              isLoggedIn={isLoggedIn}
              email={email}
              onSignOut={handleSignOut}
            />
            {
              <Routes>
                <Route
                  path="/"
                  element={
                    <ProtectedRoute
                      isLoggedIn={isLoggedIn}
                      element={Main}
                      onEditProfile={handleEditProfileClick}
                      onAddPlace={handleAddPlaceClick}
                      onEditAvatar={handleEditAvatarClick}
                      onCardClick={handleCardClick}
                      cards={cards}
                      onCardLike={handleCardLike}
                      onCardDelete={handleDeleteCard}
                    />
                  }
                />
                <Route
                  path="/sign-up"
                  element={
                    <Register
                      onRegister={handleRegister}
                      isRegistered={isRegistered}
                    />
                  }
                />
                <Route
                  path="/sign-in"
                  element={<Login onLogin={handleLogin} />}
                />
                <Route path="*" element={<PageNotFound />} />
                <Route
                  path="/react-mesto-auth"
                  element={
                    isLoggedIn ? (
                      <Navigate to="/" />
                    ) : (
                      <Navigate to="/sign-in" />
                    )
                  }
                />
              </Routes>
            }
            <Footer />
            <EditProfilePopup
              isOpen={isEditProfilePopupOpen}
              onUpdateUser={handleUpdateUser}
            />
            <AddPlacePopup
              isOpen={isAddPlacePopupOpen}
              onAddPlace={handleAddPlaceSubmit}
            />
            <ImagePopup card={selectedCard} onClose={closeAllPopups} />
            <EditAvatarPopup
              isOpen={isEditAvatarPopupOpen}
              onClose={closeAllPopups}
              onUpdateAvatar={handleAvatarUpdate}
              isLoading={isLoading}
            />
            <InfoToolTip
              isOpen={isInfoToolTipPopupOpen}
              onClose={closeAllPopups}
              onEscClose={handleEscClose}
              isRegistered={isRegistered}
              isLoggedIn={isLoggedIn}
              succes={"Вы успешно зарегистрировались!"}
              fail={"Что-то пошло не так! Попробуйте ещё раз."}
            />
          </div>
        </div>
      </CurrentUserContext.Provider>
    </AppContext.Provider>
  );
}

export default App;
