import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useBooksContext } from '../hooks/useBooksContext';
import { useAuthContext } from '../hooks/useAuthContext';
import StarRatings from 'react-star-ratings';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';

const BookDetails = ({ book }) => {
  const { dispatch } = useBooksContext();
  const { user } = useAuthContext();

  const handleClick = async (e) => {
    e.preventDefault();
    const user = JSON.parse(localStorage.getItem('user'));
    const token = user.token;

    const response = await fetch('/api/books/' + book._id, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    const json = await response.json();

    if (response.ok) {
      dispatch({ type: 'DELETE_BOOK', payload: json });
    }
  };

  return (
    <Card className="mb-4 shadow-sm text-decoration-none" as={Link} to={`/books/${book._id}`}>
      <Card.Body>
        <Card.Title>{book.title}</Card.Title>
        <Card.Text>
          <strong>Author:</strong> {book.author}
        </Card.Text>
        <Card.Text>
        <strong>Rating:</strong> {book.averageRating.toFixed(1)}
        <br></br>
          <StarRatings
            rating={book.averageRating}  // Pass the average rating value
            starRatedColor="rgb(230, 67, 47)"
            starHoverColor="rgb(230, 67, 47)"
            starDimension="25px"
            numberOfStars={5}
            name='rating'
          />
        </Card.Text>
        <Card.Text>
          {formatDistanceToNow(new Date(book.createdAt), { addSuffix: true })}
        </Card.Text>
        {user && user.role === 'admin' && (
          <span className="material-symbols-outlined" onClick={handleClick}>
            Delete
          </span>
        )}
      </Card.Body>
    </Card>
  );
};

export default BookDetails;
