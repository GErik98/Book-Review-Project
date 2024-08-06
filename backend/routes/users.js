const express = require('express')
const requireAuth = require('../middleware/requireAuth')

// controller functions
const { signupUser, loginUser, getUser, updateUser } = require('../controllers/userController')
const router = express.Router()

// SIGNUP new user
router.post('/users', signupUser)

// LOGIN user
router.post('/users/login', loginUser)

// GET user data
router.get('/users/me', requireAuth(), getUser)

// UPDATE user data
router.patch('/users/me', requireAuth(), updateUser)

module.exports = router