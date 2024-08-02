const User = require('../models/userModel')

// login user
const loginUser = async (req, res) => {
    res.json({mssg: 'login user'})
}
// signup user
const signupUser = async (req, res) => {
    res.json({mssg: 'signup user'})
}

// user data
const getUser = async (req, res) => {
    res.json({mssg: 'get user'})
}

module.exports = {
    loginUser,
    signupUser,
    getUser
}