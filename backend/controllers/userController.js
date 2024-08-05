const User = require('../models/userModel')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const createToken = (_id) =>{
    return jwt.sign({_id}, process.env.SECRET, { expiresIn: '3d' })
}

// login user
const loginUser = async (req, res) => {
    const {email, password} = req.body

    try {
        const user = await User.login(email, password)

        // create a token
        const token = createToken(user._id)
        
        const role = user.role
        const id = user._id
        const username = user.username

        res.status(200).json({email, username, token, role, id})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}
// signup user
const signupUser = async (req, res) => {
    const {email, username, password} = req.body

    try {
        const user = await User.signup(email, username, password)

        // create a token
        const token = createToken(user._id)

        const role = user.role
        const id = user._id

        res.status(200).json({email, username, token, role, id})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

// user data
const getUser = async (req, res) => {
    try {
      const user = await User.findById(req.user._id).select('-password'); // Exclude password field
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

module.exports = {
    loginUser,
    signupUser,
    getUser
}