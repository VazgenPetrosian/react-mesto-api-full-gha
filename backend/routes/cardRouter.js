const cardRouter = require('express').Router();
const {
  getAllCard,
  deleteCard,
  createCard,
  createLikeCard,
  createDislikeCard,
} = require('../controllers/card');
const { validateNewCard, validateCardId } = require('../utils/validationConfig');

cardRouter.post('/', validateNewCard, createCard);
cardRouter.get('/', getAllCard);
cardRouter.delete('/:cardId', validateCardId, deleteCard);
cardRouter.put('/:cardId/likes', validateCardId, createLikeCard);
cardRouter.delete('/:cardId/likes', validateCardId, createDislikeCard);

module.exports = cardRouter;
