import React from "react";
import iconLike from "../images/Like.svg";
import trashCan from "../images/trashcan.svg";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card({card, onCardClick, onCardLike, onCardDelete}) {
  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = card.owner === currentUser._id;
  const isLiked = card.likes.includes((currentUser._id));
  const cardLikeButtonClassName = `card__like ${
    isLiked ? "card__like_active" : ""
  }`;

  function handleClick() {
    onCardClick(card);
  }
  function handleLikeClick() {
    onCardLike(card);
  }
  function handleDeleteCard() {
    onCardDelete(card);
  }
  return (
    <article className="card">
      {isOwn && (
        <button
          className="card__trashcan"
          type="button"
          onClick={handleDeleteCard}
          style={{ backgroundImage: `url(${trashCan})` }}
        ></button>
      )}
      <img
        className="card__image"
        onClick={handleClick}
        src={card.link}
        alt={card.name}
      />
      <div className="card__block">
        <h2 className="card__heading">{card.name}</h2>
        <button
          className={cardLikeButtonClassName}
          type="button"
          onClick={handleLikeClick}
        >
          <p className="card__likes-number">{card.likes.length}</p>
        </button>
      </div>
    </article>
  );
}
export default Card;
