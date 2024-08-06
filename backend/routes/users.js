const express = require('express')
const requireAuth = require('../middleware/requireAuth')

// controller functions
const { signupUser, loginUser, getUser, updateUser } = require('../controllers/userController')
const router = express.Router()

/**
* @openapi
* /api/users:
*   post:
*     tags:
*       - Users
*     summary: Signup a new user
*     description: Creates a new user account. No authentication required.
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             type: object
*             properties:
*               email:
*                 type: string
*                 description: The email of the user
*               username:
*                 type: string
*                 description: The username of the user
*               password:
*                 type: string
*                 description: The password for the user account
*             required:
*               - email
*               - username
*               - password
*     responses:
*       200:
*         description: User successfully created
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 email:
*                   type: string
*                   description: The email of the user
*                 username:
*                   type: string
*                   description: The username of the user
*                 token:
*                   type: string
*                   description: Authentication token
*                 role:
*                   type: string
*                   description: The role of the user
*                 id:
*                   type: string
*                   description: The unique identifier for the user
*       400:
*         description: Invalid input or request
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 error:
*                   type: string
*                   example: 'Error message'
 */
router.post('/users', signupUser)

/**
* @openapi
* /api/users/login:
*   post:
*     tags:
*       - Users
*     summary: Login a user
*     description: Authenticates a user and returns a token. No authentication required.
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             type: object
*             properties:
*               email:
*                 type: string
*                 description: The email of the user
*               password:
*                 type: string
*                 description: The password for the user account
*             required:
*               - email
*               - password
*     responses:
*       200:
*         description: User successfully logged in
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 email:
*                   type: string
*                   description: The email of the user
*                 username:
*                   type: string
*                   description: The username of the user
*                 token:
*                   type: string
*                   description: Authentication token
*                 role:
*                   type: string
*                   description: The role of the user
*                 id:
*                   type: string
*                   description: The unique identifier for the user
*       400:
*         description: Invalid email or password
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 error:
*                   type: string
*                   example: 'Invalid email or password'
 */
router.post('/users/login', loginUser)

/**
* @openapi
* /api/users/me:
*   get:
*     tags:
*       - Users
*     summary: Get user data
*     description: Retrieves the data of the currently authenticated user. Authentication required.
*     responses:
*       200:
*         description: User data successfully retrieved
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 email:
*                   type: string
*                   description: The email of the user
*                 username:
*                   type: string
*                   description: The username of the user
*                 role:
*                   type: string
*                   description: The role of the user
*                 id:
*                   type: string
*                   description: The unique identifier for the user
*       404:
*         description: User not found
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 error:
*                   type: string
*                   example: 'User not found'
*     security:
*       - bearerAuth: []

 */
router.get('/users/me', requireAuth(), getUser)

/**
* @openapi
* /api/users/me:
*   patch:
*     tags:
*       - Users
*     summary: Update user data
*     description: Updates the data of the currently authenticated user. Authentication required.
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             type: object
*             properties:
*               username:
*                 type: string
*                 description: The new username for the user
*             required:
*               - username
*     responses:
*       200:
*         description: User data successfully updated
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 email:
*                   type: string
*                   description: The email of the user
*                 username:
*                   type: string
*                   description: The updated username of the user
*                 role:
*                   type: string
*                   description: The role of the user
*                 id:
*                   type: string
*                   description: The unique identifier for the user
*       404:
*         description: User not found
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 error:
*                   type: string
*                   example: 'User not found'
*       500:
*         description: Internal server error
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 error:
*                   type: string
*                   example: 'An unexpected error occurred'
*     security:
*       - bearerAuth: []
 */
router.patch('/users/me', requireAuth(), updateUser)

module.exports = router