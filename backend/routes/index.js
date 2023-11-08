const router = require('express').Router();
const auth = require('../middlewares/auth');
const { validateLogin, validateRegistration } = require('../utils/validationConfig');
const NotFound = require('../errors/NotFoundError');
const { loginUser, createUser } = require('../controllers/user');

router.use('/users', auth, require('./userRouter'));
router.use('/cards', auth, require('./cardRouter'));

router.use('/signin', validateLogin, loginUser);
router.use('/signup', validateRegistration, createUser);

router.use('*', auth, (req, res, next) => {
  next(new NotFoundError('Указанного пути нет'));
});

module.exports = router;