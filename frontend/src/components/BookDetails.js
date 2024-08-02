import { Card, Button } from 'react-bootstrap';
import { useBooksContext } from '../hooks/useBooksContext'

import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const BookDetails = ({ book }) => {
    const { dispatch } = useBooksContext()

    const handleClick = async () => {
        const response = await fetch('/api/books/' + book._id, {
            method: 'DELETE'
        })
        const json = await response.json()

        if (response.ok) {
            dispatch({type: 'DELETE_BOOK', payload: json})
        }
    }

    return(
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
            <strong>Rating:</strong> {book.avarageRating}
          </Card.Text>
          <Card.Text>
            {formatDistanceToNow(new Date(book.createdAt), { addSufix: true })}
          </Card.Text>
          <span className="material-symbols-outlined" onClick={handleClick}>Delete</span>
        </Card.Body>
      </Card>

    )
}

export default BookDetails