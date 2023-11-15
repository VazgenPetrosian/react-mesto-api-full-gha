const SECRET = process.env.NODE_ENV === 'production' ? process.env.JWT_SECRET : 'secret-key';
// const SECRET = 'secret-key';
const PORT = 4000;

module.exports = {
  SECRET, PORT,
};
