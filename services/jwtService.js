const jwt = require('jsonwebtoken');
const secret = 'Secret_Key1-2-3.';

const createToken = function (user) {
    return jwt.sign(user, secret, { expiresIn: '1d' });
};

const verifyToken = function (token) {
    return jwt.verify(token, secret);
}

module.exports = {
    createToken,
    verifyToken
};
