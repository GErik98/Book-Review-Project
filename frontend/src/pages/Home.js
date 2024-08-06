import { useEffect } from 'react'
import { useBooksContext} from '../hooks/useBooksContext'
import { useAuthContext } from '../hooks/useAuthContext';
import { Container, Button, Alert, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
// components
import BookDetails from '../components/BookCard'
import BookForm from '../components/BookForm'

const Home = () => {
    const {books, dispatch} = useBooksContext()
    const { user } = useAuthContext()
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBooks = async () => {
            const response = await fetch('/api/books/')
            const json = await response.json()

            if (response.ok) {
                dispatch({type: 'SET_BOOKS', payload: json})
            }
        }

        fetchBooks()
    }, [dispatch])

    const handleLoginClick = () => {
      navigate('/login');
    };

    return (
        <Container className="home mt-4">
        <Row>
          <Col md={8}>
            <div className='books'>
              {books && books.map((book) => (
                <BookDetails key={book._id} book={book} />
              ))}
            </div>
          </Col>
          <Col md={4}>
          {user ? (
            <BookForm />
          ) : (
            <Alert variant="info" className="text-center">
            <Row className="align-items-center">
              <Col>Log in to add your favourite books!</Col>
              <Col className="text-end">
                <Button variant="button" onClick={handleLoginClick} className='btn btn-primary'>Log In</Button>
              </Col>
            </Row>
          </Alert>
          )
          }
          </Col>
        </Row>
      </Container>
    )
}

export default Home