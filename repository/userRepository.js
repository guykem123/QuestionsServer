const path = require('path')
const fs = require('fs');
const bcrypt = require('../services/bcryptService')
const fileName = path.join(__dirname, 'users.json');

async function findUser(username) {
  const users = await getAllUsers();
  const user = users.find(u => u.username == username)
  return user
}

async function getAllUsers() {
  const users = await getAllUsers();
  return users;
}

async function addUser(user) {
  user.password = await bcrypt.createHashPassword(user.password);
  await addToUsers(user)
}

async function updatePassword(userId, newPassword) {
  let users = await getAllUsers();
  let user = users.find(x => x.id == userId)
  user.password = await bcrypt.createHashPassword(newPassword);
  await rewriteUsers(users)
}

async function deleteUser(userId) {
  let users = await getAllUsers();
  users = users.filter(u => u.id != userId)
  user.id = new mongoose.Types.ObjectId();
  await rewriteUsers(users)
}


function addToUsers(user) {
  return createPromise(() => {
    let usersDb = fs.readFileSync(fileName);
    usersDb = JSON.parse(usersDb)
    user.id = `U${usersDb.identity}`
    usersDb.identity += 1
    const users = usersDb.users;
    users.push(user)
    let data = JSON.stringify(usersDb);
    return fs.writeFileSync(fileName, data);
  })
}

function rewriteUsers(users) {
  return createPromise(() => {
    let usersDb = fs.readFileSync(fileName);
    usersDb = JSON.parse(usersDb)
    usersDb.users = users
    let data = JSON.stringify(usersDb);
    return fs.writeFileSync(fileName, data);
  })
}

function getAllUsers() {
  return createPromise(() => {
    const usersDb = fs.readFileSync(fileName);
    return JSON.parse(usersDb).users;
  })
}

function createPromise(callback) {
  return new Promise((res, rej) => {
    try {
      const value = callback();
      res(value);
    } catch (err) {
      rej(err);
    }
  })
}

module.exports = {
  findUser,
  addUser,
  getAllUsers,
  deleteUser,
  updatePassword
};
