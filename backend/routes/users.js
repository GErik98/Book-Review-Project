const express = require('express')

// controller functions
const { signupUser, loginUser, getUser } = require('../controllers/userController')
const router = express.Router()

// SIGNUP new user
router.post('/users', signupUser)

// LOGIN user
router.post('/users/login', loginUser)

// GET user data
router.get('/users/me', getUser)

module.exports = router