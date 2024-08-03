import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom'
import { useBooksContext } from '../hooks/useBooksContext'
import { useAuthContext } from '../hooks/useAuthContext'

import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const BookDetails = ({ book }) => {
    const { dispatch } = useBooksContext()
    const { user } = useAuthContext()

    const handleClick = async () => {
      const user = JSON.parse(localStorage.getItem('user'))
      const token = user.token

        const response = await fetch('/api/books/' + book._id, {
            method: 'DELETE',
            headers: {
              'Authorization': `Bearer ${token}`
            }
        })
        const json = await response.json()

        if (response.ok) {
            dispatch({type: 'DELETE_BOOK', payload: json})
        }
    }

    return(
        <Card className="mb-4 shadow-sm text-decoration-none" as={Link} to="/book:id">
        <Card.Body>
          <Card.Title>{book.title}</Card.Title>
          <Card.Text>
            <strong>Author:</strong> {book.author}
          </Card.Text>
          {/*<Card.Text>
            <strong>Description:</strong> {book.description}
          </Card.Text>*/}
          <Card.Text>
            <strong>Rating:</strong> {book.avarageRating}
          </Card.Text>
          <Card.Text>
            {formatDistanceToNow(new Date(book.createdAt), { addSufix: true })}
          </Card.Text>
          {user && user.role === 'admin' &&
            <span className="material-symbols-outlined" onClick={handleClick}>Delete</span>
          }
          
        </Card.Body>
      </Card>

    )
}

export default BookDetails