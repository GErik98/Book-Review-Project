import { useEffect } from 'react'
import { useBooksContext} from '../hooks/useBooksContext'
import { Container, Row, Col } from 'react-bootstrap';
// components
import BookDetails from '../components/BookDetails'
import BookForm from '../components/BookForm'

const Home = () => {
    const {books, dispatch} = useBooksContext()

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
            <BookForm />
          </Col>
        </Row>
      </Container>
    )
}

export default Home