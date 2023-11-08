const userRouter = require('express').Router();
const { validateUserId, validateUserUpdate, validateUpdateAvatar } = require('../utils/validationConfig');
const {
  getUsers,
  getUserById,
  updateUserById,
  updateUserAvatarById,
  getInfoAboutMe,
} = require('../controllers/user');

userRouter.get('/me', getInfoAboutMe);
userRouter.get('/', getUsers);
userRouter.get('/:userId', validateUserId, getUserById);
userRouter.patch('/me', validateUserUpdate, updateUserById);
userRouter.patch('/me/avatar', validateUpdateAvatar, updateUserAvatarById);

module.exports = userRouter;
