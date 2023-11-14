const SECRET = process.env.NODE_ENV === 'production' ? process.env.JWT_SECRET : 'dev';
// const SECRET = 'secret-key';
const { MONGO_DB } = "mongodb://127.0.0.1:27017/mestodb";
const PORT = 4000;

module.exports = {
  SECRET, PORT,
}