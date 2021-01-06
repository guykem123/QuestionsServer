const bcrypt = require("bcryptjs");
const hashKey = 10

async function checkPassword(reqPassword, userPassword) {
  return bcrypt.compare(reqPassword, userPassword)
}

async function createHashPassword(password) {
  return bcrypt.hash(password, hashKey)
}


module.exports = {
  checkPassword,
  createHashPassword
};
