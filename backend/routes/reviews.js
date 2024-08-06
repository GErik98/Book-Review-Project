const express = require('express')
const {
    newReview,
    getReviews,
    updateReview,
    deleteReview
} = require('../controllers/reviewController')
const requireAuth = require('../middleware/requireAuth')
const router = express.Router()

/**
* @openapi
* /api/books/{bookId}/reviews:
*   post:
*     tags:
*       - Reviews
*     summary: Create a new review
*     description: Adds a new review for a specified book. Authentication is required.
*     parameters:
*       - in: path
*         name: bookId
*         required: true
*         schema:
*           type: string
*         description: The ID of the book for which the review is being created
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             type: object
*             properties:
*               userId:
*                 type: string
*                 description: The ID of the user creating the review
*               rating:
*                 type: number
*                 format: float
*                 description: The rating given in the review
*               comment:
*                 type: string
*                 description: The comment provided in the review
*             required:
*               - userId
*               - rating
*               - comment
*     responses:
*       201:
*         description: Review successfully created
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/Review'
*       400:
*         description: Invalid request or input
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 message:
*                   type: string
*                   example: 'Invalid Book ID'
*     security:
*       - bearerAuth: []
*/
router.post('/books/:bookId/reviews', requireAuth('user'), newReview);

/**
* @openapi
* /api/books/{bookId}/reviews:
*   get:
*     tags:
*       - Reviews
*     summary: Get all reviews for a book
*     description: Retrieves all reviews associated with a specified book. Authentication is not required.
*     parameters:
*       - in: path
*         name: bookId
*         required: true
*         schema:
*           type: string
*         description: The ID of the book for which to retrieve reviews
*     responses:
*       200:
*         description: A list of reviews for the book
*         content:
*           application/json:
*             schema:
*               type: array
*               items:
*                 $ref: '#/components/schemas/Review'
*       400:
*         description: Invalid request or input
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 error:
*                   type: string
*                   example: 'Error message'
 */
router.get('/books/:bookId/reviews', getReviews);

/**
* @openapi
* /api/reviews/{id}:
*   patch:
*     tags:
*       - Reviews
*     summary: Update a review
*     description: Updates a review specified by its ID. Authentication is required.
*     parameters:
*       - in: path
*         name: id
*         required: true
*         schema:
*           type: string
*         description: The ID of the review to update
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             type: object
*             properties:
*               rating:
*                 type: number
*                 format: float
*                 description: The updated rating
*               comment:
*                 type: string
*                 description: The updated comment
*             required:
*               - rating
*               - comment
*     responses:
*       200:
*         description: Review successfully updated
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/Review'
*       400:
*         description: Invalid request or input
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 error:
*                   type: string
*                   example: 'Error message'
*       404:
*         description: Review not found
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 error:
*                   type: string
*                   example: 'Review not found'
*       403:
*         description: Access denied
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 error:
*                   type: string
*                   example: 'Access denied'
*     security:
*       - bearerAuth: []
 */
router.patch('/reviews/:id', requireAuth('user'), updateReview);

/**
* @openapi
* /api/reviews/{id}:
*   delete:
*     tags:
*       - Reviews
*     summary: Delete a review
*     description: Deletes a review specified by its ID. Authentication is required.
*     parameters:
*       - in: path
*         name: id
*         required: true
*         schema:
*           type: string
*         description: The ID of the review to delete
*     responses:
*       200:
*         description: Review successfully deleted
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 message:
*                   type: string
*                   example: 'Review deleted successfully'
*       400:
*         description: Invalid request or input
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 error:
*                   type: string
*                   example: 'Error message'
*       404:
*         description: Review not found
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 error:
*                   type: string
*                   example: 'Review not found'
*       403:
*         description: Access denied
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 error:
*                   type: string
*                   example: 'Access denied'
*     security:
*       - bearerAuth: []
 */
router.delete('/reviews/:id', requireAuth('user'), deleteReview);

module.exports = router