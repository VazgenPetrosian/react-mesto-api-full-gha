const mongoose = require('mongoose');
const { ValidationError } = mongoose.Error;
const { HTTP_STATUS_CREATED, HTTP_STATUS_OK } = require('http2').constants;
const NotFoundError = require('../errors/NotFoundError');
const BadRequestError = require('../errors/BadRequestError');
const ForbiddenError = require('../errors/ForbiddenError');
const cardModel = require('../models/card');

const createCard = (req, res, next) => {
  const { name, link } = req.body;
  cardModel
    .create({ name, link, owner: req.user._id })
    .then((card) => {
      res.status(HTTP_STATUS_CREATED).send(card);
    })
    .catch((error) => {
      if (error instanceof ValidationError) {
        next(new BadRequestError(error.message));
      } else {
        next(error);
      }
    });
};

const deleteCard = (req, res, next) => {
  cardModel.findById(req.params.cardId)
    // .orFail(new NotFoundError('Передан несуществующий ID карточки.'))
    .then((card) => {
      if (!card.owner.equals(req.user._id)) return next(new ForbiddenError('Эта карточка принадлежит другому пользователю.'));

      return cardModel.deleteOne(card)
        .then(() => res.send({ message: card }));
    })
    .catch((error) => next(error));
};

const getAllCard = (req, res, next) => {
  cardModel
    .find({})
    // .populate(['owner', 'likes'])
    .then((cards) => 
    res.send(cards ))
    .catch((error) => next(error));
};

const createLikeCard = (req, res, next) => {
  cardModel
    .findByIdAndUpdate(
      req.params.cardId,
      { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
      { new: true },
    )
    // .then((result) => result.populate(['owner', 'likes']))
    // .orFail(new NotFoundError('Передан несуществующий ID карточки'))
    .then((card) => {
      res.send(card)})
    .catch((error) => next(error));
};

const createDislikeCard = (req, res, next) => {
  cardModel
    .findByIdAndUpdate(
      req.params.cardId,
      { $pull: { likes: req.user._id } }, // убрать _id из массива
      { new: true },
    )
    // .populate(['owner', 'likes'])
    // .then((result) => result.populate(['owner', 'likes']))
    // .orFail(new NotFoundError('Передан несуществующий ID крочки'))
    .then((card) => {
      console.log(card);
      res.send(card);
    })
    .catch((error) => next(error));
};

module.exports = {
  createCard,
  deleteCard,
  getAllCard,
  createLikeCard,
  createDislikeCard,
};
