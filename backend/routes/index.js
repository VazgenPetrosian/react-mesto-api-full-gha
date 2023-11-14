const router = require('express').Router();
const auth = require('../middlewares/auth');
const { validateLogin, validateRegistration } = require('../utils/validationConfig');
const NotFound = require('../errors/NotFoundError');
const { loginUser, createUser } = require('../controllers/user');

router.use('/api/users', auth, require('./userRouter'));
router.use('/api//cards', auth, require('./cardRouter'));

router.use('/api/signin', validateLogin, loginUser);
router.use('/api/signup', validateRegistration, createUser);

router.use('*', auth, (req, res, next) => {
  next(new NotFoundError('Указанного пути нет'));
});

module.exports = router;