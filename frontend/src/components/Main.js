import React from "react";
import Card from "./Card";
import { useContext } from 'react';
import { CurrentUserContext } from "../contexts/CurrentUserContext";
function Main(props) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <main className="main-page">
      <section className="profile">
        <button className="profile__avatar-button" onClick={props.onEditAvatar}>
          <img
            className="profile__avatar"
            src={currentUser.avatar}
            alt={currentUser.about}
          />
        </button>
        <div className="profile__info">
          <button
            onClick={props.onEditProfile}
            type="button"
            className="profile__edit-button"
          ></button>
          <h1 className="profile__name">{currentUser.name}</h1>
          <p className="profile__desc-profile">{currentUser.about}</p>
        </div>
        <button
          type="button"
          className="profile__add-button"
          onClick={props.onAddPlace}
        ></button>
      </section>
      <section className="cards">
        {props.cards.map((card) => (
          // eslint-disable-next-line no-sequences
          <Card
            key={card._id}
            card={card}
            onCardClick={props.onCardClick}
            onCardLike={props.onCardLike}
            onCardDelete={props.onCardDelete}
          />
        ))}
      </section>
    </main>
  );
}

export default Main;
