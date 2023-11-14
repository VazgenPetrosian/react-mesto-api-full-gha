const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { ValidationError } = mongoose.Error;
const { HTTP_STATUS_OK, HTTP_STATUS_CREATED } = require('http2').constants;
const BadRequestError = require('../errors/BadRequestError');
const ConflictError = require('../errors/ConflictError');
const NotFoundError = require('../errors/NotFoundError');
const userModel = require('../models/user');
const { SECRET } = require('../utils/config');

const createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;

  return bcrypt.hash(password, 10)
  .then((hash) => userModel.create({
      name, about, avatar, email, password: hash,
    }))
    .then(() => res.status(HTTP_STATUS_CREATED).send({ name, about, avatar, email, }))
    .catch((error) => {
      if (error instanceof ValidationError) {
        next(new BadRequestError(error.message));
      } else if (error.code === 11000) {
        next(new ConflictError('Пользователь с таким email уже зарегистрирован.'));
      } else {
        next(error);
      }
    });
};

const getUsers = (req, res, next) => { 
  userModel
  .find({})
  .then((users) => res.status(HTTP_STATUS_OK).send({ data: users}))
  .catch((error) => next(error)); 
};

const getInfoAboutMe = (req, res, next) => {
  userModel.findById(req.user._id)
    .then((userData) => res.send( userData ))
    .catch((error) => next(error));
};

const getUserById = (req, res, next) => {
  userModel
    .findById(req.params.userId)
    // .orFail(new NotFoundError('Пользователь с таким ID не найден'))
    .then((userData) => {
      res.status(HTTP_STATUS_OK).send({ data: userData });
    })
    .catch(next);
};

const updateUserById = (req, res, next) => {
  const { name, about } = req.body;

  userModel.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
    // .orFail(new NotFoundError('Пользователь с таким ID не найден.'))
    .then((updatedUserData) => res.send({ data: updatedUserData }))
    .catch((error) => {
      if (error instanceof ValidationError) {
        next(new BadRequestError(error.message));
      } else {
        next(error);
      }
    });
};

const updateUserAvatarById = (req, res, next) => {
  const { avatar } = req.body;

  userModel.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
    // .orFail(new NotFoundError('Некорректный ID пользователя.'))
    .then((newAvatar) => res.send({ data: newAvatar }))
    .catch((error) => {
      if (error instanceof ValidationError) {
        next(new BadRequestError(error.message));
      } else {
        next(error);
      }
    });
};

const loginUser = (req, res, next) => {
  console.log(SECRET);
  const { email, password } = req.body;
  return userModel.findUserByCredentials(email, password)
  .then((user) => {
    const jwtToken = jwt.sign({ _id: user._id}, SECRET, { expiresIn: "7d"});
    res.send({ jwtToken });
  })
  .catch((error) => next(error));
};

module.exports = {
  createUser,
  getUsers,
  getUserById,
  updateUserById,
  updateUserAvatarById,
  loginUser,
  getInfoAboutMe,
};
