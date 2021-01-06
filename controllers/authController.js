const jwt = require("../services/jwtService");
const bcrypt = require('../services/bcryptService')
const db = require("../repository/userRepository");


const register = async (req, res) => {
    try {
        //check if user exist
        const user = await db.findUser(req.body.username)
        if (user) {
            return res.status(409).json({
                message: "user already exist,try again"
            });
        }
        await db.addUser(req.body)
        return res.status(201).json({
            message: "User Created Successfully"
        });
    } catch (error) {
        return res.status(500).json({
            message: "Failure to create user"
        });
    }
}

const login = async (req, res) => {
    try {
        const user = await db.findUser(req.body.username)
        if (await bcrypt.checkPassword(req.body.password, user.password)) {
            delete user.password
            let token = jwt.createToken(user);
            return res.status(200).json({
                message: "Auth successful",
                user,
                token
            });
        }
        return res.status(401).json({
            message: "Password or Username is Incorrect"
        });
    } catch (error) {
        return res.status(500).json({
            message: "Auth failed"
        });
    }
}

const changePassword = async (req, res) => {
    try {
        const { username, oldPassword, newPassword } = req.body
        const user = await db.findUser(username)
        if (await bcrypt.checkPassword(oldPassword, user.password)) {
            await db.updatePassword(user.id, newPassword)
            return res.status(200).json({
                message: "Change Password Successfully",
            });
        }
        return res.status(401).json({
            message: "Old password is incorrect"
        });
    } catch (error) {
        return res.status(500).json({
            message: "Auth failed"
        });
    }
}

module.exports = {
    register,
    login,
    changePassword
};
