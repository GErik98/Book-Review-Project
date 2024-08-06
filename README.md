# Book Review Application

A web application for managing books and user reviews. Users can view book details, submit reviews, and admins can manage books and reviews.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)

## Installation

### Prerequisites

- [Node.js](https://nodejs.org/) (>=14.0.0)
- [MongoDB](https://www.mongodb.com/try/download/community) (Local or Atlas)

### Frontend Setup

1. **Clone the Repository**
   ```bash
   git clone https://github.com/Gerik98/Felveteli_feladat.git
   ```
2. **Navigate to the Frontend Directory**
   ```bash
   cd .\Felveteli_feladat\frontend\
   ```
3. **Install Dependencies**
   ```bash
   npm install
   ```
4. **Start the Development Server**
   ```bash
   npm start
   ```
   The application will run on http://localhost:3000

### Backend Setup

1. **Navigate to the Backend Directory**
   open a new terminal
   cd .\Felveteli_feladat\backend\

2. **Install Dependencies**
   npm install

3. **Set Up Enviroment Variables**
   Crate a '.env' file in the `backend` directory with the following variables:

   MONGO_URI=mongodb+srv://gacsierik123:eznuEgQSamnBKGvb@book-review-api.fdkdjtx.mongodb.net/?retryWrites=true&w=majority&appName=book-review-api
   SECRET=hafonog48

4. **Start the Server**
   npm run dev

## Usage

### Navigating the Application

- Home Page: Displays a list of books. Clicking on the 'Book Reviewer' title of the navbar will redirect to here.

- Book Detail Page: Shows details of a selected book, including reviews. Clicking on a card of a book will redirect to here.

- Submit Review: Authenticated users can submit reviews on book detail pages.

- Admin Actions: Admins can delete books from the detail page.

### API Endpoints

# BOOKS:

- POST /api/books/:
  - Create a new book.
- GET /api/books:
  - Get all books.
- GET /api/books/{id}:
  - Get a book by ID
- PATCH /api/books/{id}:
  - Update a book.
- DELETE /api/books/{id}:
  - Delete a specific book (Admin only).

# USERS:

- POST /api/users:
  - Sign up a new user.
- POST /api/users/login:
  - Log in a user.
- GET /api/users/me:
  - Get the logged-in user's data.
- PATCH /api/users/me:
  - Update user's data.

# REVIEWS:

- POST /api/books/{bookId}/reviews:
  - Create a new review
- GET /api/books/{bookId}/reviews:
  - Get all reviews for a book
- PATCH /api/reviews/{id}:
  - Update a review
- DELETE /api/reviews/{id}:
  - Delete a review

### Authentication

    Use JWT tokens for authentication. Tokens are expected in the Authorization header as Bearer <token>.

### Project Structure

    .
    ├── backend/            # Backend Node.js application
    │ ├── controllers/      # Route controllers
    │ ├── models/           # Mongoose models
    │ │ ├── bookModel.js    # Book schema
    │ │ ├── reviewModel.js  # Review schema
    │ │ └── userModel.js    # User schema
    │ ├── routes/           # API routes
    │ ├── middleware/       # Express middleware
    │ ├── server.js         # Main server file
    │ ├── package.json      # Backend dependencies
    │ ├── swagger.js        # Swagger documentation
    │ └── ... # Other backend files
    │
    ├── frontend/           # Frontend React application
    │ ├── public/           # Public files
    │ ├── src/              # Source files
    ├── components/         # Reusable components
    │ │ ├── hooks/          # Custom hooks
    │ │ ├── pages/          # Application pages
    │ │ ├── App.js          # Main App component
    │ │ └── index.js        # Entry point
    │ ├── package.json      # Frontend dependencies
    │ └── ... # Other frontend files
    │
    ├── README.md # Project documentation
    └── ... # Other root files
