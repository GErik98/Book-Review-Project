import React, { useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, Button, ListGroup, Form } from 'react-bootstrap';
import { useAuthContext } from '../hooks/useAuthContext';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import StarRatings from 'react-star-ratings';

const BookDetailPage = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const { user } = useAuthContext();
  const navigate = useNavigate();

  const fetchBook = useCallback(async () => {
    try {
      const response = await fetch(`/api/books/${id}`, {
        method: 'GET'
      });
      const json = await response.json();

      if (response.ok) {
        setBook(json);

        if (!json.reviews) {
          const reviewsResponse = await fetch(`/api/books/${id}/reviews`, {
            method: 'GET'
          });
          const reviewsJson = await reviewsResponse.json();
          
          if (reviewsResponse.ok) {
            setBook(prevBook => ({
              ...prevBook,
              reviews: reviewsJson
            }));
          } else {
            console.error(reviewsJson.error);
          }
        }
      } else {
        console.error(json.error);
      }
    } catch (error) {
      console.error('Failed to fetch book', error);
    }
  }, [id]); // Include id as a dependency

  useEffect(() => {
    fetchBook();
  }, [fetchBook]); // Use fetchBook in the dependency array

  if (!book) {
    return <div>Loading...</div>;
  }

  const handleDeleteClick = async () => {
    const token = user.token;

    try {
      const response = await fetch(`/api/books/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const json = await response.json();

      if (response.ok) {
        navigate('/');
      } else {
        console.error(json.error);
      }
    } catch (error) {
      console.error('Failed to delete book', error);
    }
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
  
    // Validate the comment length
    if (comment.length < 10) {
      console.error('Comment must be at least 10 characters long.');
      alert('Comment must be at least 10 characters long.');
      return;
    }
  
    const token = user.token;
  
    try {
      const response = await fetch(`/api/books/${id}/reviews`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ rating, comment, userId: user.id })
      });
      const json = await response.json();
  
      if (response.ok) {
        await fetchBook();
        setRating(0);
        setComment('');
      } else {
        console.error(json.error);
        alert(json.error || 'Failed to submit review.');
      }
    } catch (error) {
      console.error('Failed to submit review', error);
      alert('Failed to submit review. Please try again later.');
    }
  };
  

  const changeRating = (newRating) => {
    setRating(newRating);
  };

  return (
    <Card className="mb-4 shadow-sm">
      <Card.Body>
        <Card.Title>{book.title}</Card.Title>
        <Card.Text>
          <strong>Author:</strong> {book.author}
        </Card.Text>
        <Card.Text>
          <strong>Description:</strong> {book.description}
        </Card.Text>
        <Card.Text>
          <strong>Rating:</strong> {book.averageRating.toFixed(1)}
        </Card.Text>
        <Card.Text>
          {formatDistanceToNow(new Date(book.createdAt), { addSuffix: true })}
        </Card.Text>
        <ListGroup className="list-group-flush">
          {book.reviews && book.reviews.length > 0 ? (
            book.reviews.map((review) => (
              <ListGroup.Item key={review._id}>
                <strong>{review.user?.email || 'Unknown User'}:</strong><br />
                <StarRatings
                  starRatedColor="rgb(230, 67, 47)"
                  starDimension="20px"
                  rating={review.rating}
                  numberOfStars={5}
                  name='rating'
                  starSpacing="2px"
                />
                <p>{review.comment || 'No comment provided'}</p>
              </ListGroup.Item>
            ))
          ) : (
            <ListGroup.Item>No reviews yet</ListGroup.Item>
          )}
        </ListGroup>

        {user && user.role === 'admin' && (
          <Button variant="danger" onClick={handleDeleteClick}>Delete</Button>
        )}
        {user && (
          <Form onSubmit={handleReviewSubmit} className="mt-4">
            <Form.Group controlId="rating">
              <Form.Label>Rating:</Form.Label><br />
              <StarRatings
                starRatedColor="rgb(230, 67, 47)"
                starHoverColor="rgb(230, 67, 47)"
                starDimension="25px"
                rating={rating}
                changeRating={changeRating}
                numberOfStars={5}
                name='rating'
              />
            </Form.Group>
            <Form.Group controlId="comment" className="mt-3">
              <Form.Label>Comment</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                required
              />
            </Form.Group>
            <Button type="submit" variant="primary" className="mt-3">Submit Review</Button>
          </Form>
        )}
      </Card.Body>
    </Card>
  );
};

export default BookDetailPage;
