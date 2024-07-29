const express = require('express')

const router = express.Router()

// CREATE new user
router.post('/users', (req, res) => {
    res.json({mssg: 'CREATE new user'})
})

// LOGIN user
router.post('/users/login', (req, res) => {
    res.json({mssg: 'LOGIN user'})
})

// GET user data
router.get('/users/me', (req, res) => {
    res.json({mssg: 'GET user data'})
})

module.exports = router