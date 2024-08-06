const express = require('express');
const {
    newBook,
    getBooks,
    getBook,
    updateBook,
    deleteBook
} = require('../controllers/bookController');
const requireAuth = require('../middleware/requireAuth');
const router = express.Router();

/**
 * @openapi
 * /api/books/:
 *   post:
*     tags:
*       - Books
 *     summary: Create a new book
 *     description: Adds a new book to the collection.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Book'
 *     responses:
 *       200:
 *         description: Book created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Book'
 *       400:
 *         description: Invalid request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: 'Error message'
 */
router.post('/', newBook);

/**
 * @openapi
 * /api/books:
 *   get:
*     tags:
*       - Books
 *     summary: Get all books
 *     description: Retrieves a list of all books.
 *     responses:
 *       200:
 *         description: A list of books
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Book'
 */
router.get('/', getBooks);

/**
 * @openapi
 * /api/books/{id}:
 *   get:
*     tags:
*       - Books
 *     summary: Get a book by ID
 *     description: Retrieves a book by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the book to retrieve
 *     responses:
 *       200:
 *         description: A single book
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Book'
 *       404:
 *         description: Book not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: 'Book not found'
 *       500:
 *         description: Internal server error
 *         content:
 *          application/json:
 *             schema:
 *              type: object
 *              properties:
 *                  error:
 *                      type: string
 *                      example: 'An unexpected error occures'
 * 
 */
router.get('/:id', getBook);

/**
 * @openapi
 * /api/books/{id}:
 *   patch:
*     tags:
*       - Books
 *     summary: Update a book
 *     description: Updates a book's information.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the book to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Book'
 *     responses:
 *       200:
 *         description: Book updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Book'
 *       400:
 *         description: Invalid request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: 'Error message'
 *       404:
 *         description: Book not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: 'Book not found'
 */
router.patch('/:id', requireAuth('admin'), updateBook);

/**
 * @openapi
 * /api/books/{id}:
 *   delete:
*     tags:
*       - Books
 *     summary: Delete a book
 *     description: Deletes a book by ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the book to delete
 *     responses:
 *       200:
 *         description: Book deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 'Book and associated reviews deleted successfully'
 *       404:
 *         description: Book not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: 'Book not found'
 */
router.delete('/:id', requireAuth('admin'), deleteBook);

module.exports = router;
