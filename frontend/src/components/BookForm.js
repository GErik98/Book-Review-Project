import { useState } from 'react'
import { useBooksContext } from '../hooks/useBooksContext'

import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap'

const BookForm = () => {
    const { dispatch } = useBooksContext()
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [description, setDescription] = useState('')
    const [error, setError] = useState(null)
    const [emptyFields, setEmptyFields] = useState([])


    const handleSubmit = async (e) => {
        e.preventDefault()

        const book = {title, author, description}

        const response = await fetch('/api/books/', {
            method: 'POST',
            body: JSON.stringify(book),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const json = await response.json()

        if (!response.ok) {
            setError(json.error)
            setEmptyFields(json.emptyFields)
        }
        if (response.ok) {
            setTitle('')
            setAuthor('')
            setDescription('')
            setError(null)
            setEmptyFields([])
            console.log('New book added!', json)
            dispatch({type: 'CREATE_BOOK', payload: json})
        }
    }

    return (
        <Container className="p-0">
        <Form className="p-4 border rounded shadow-sm" onSubmit={handleSubmit}>
          <h3 className="text-center mb-4">Add a new Book</h3>
          <Form.Group className="mb-3">
            <Form.Label>Book Title:</Form.Label>
            <Form.Control
              type="text"
              className={emptyFields.includes('title') ? 'is-invalid' : ''}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            {emptyFields.includes('title') && <Form.Control.Feedback type="invalid">Title is required</Form.Control.Feedback>}
          </Form.Group>
  
          <Form.Group className="mb-3">
            <Form.Label>Author:</Form.Label>
            <Form.Control
              type="text"
              className={emptyFields.includes('author') ? 'is-invalid' : ''}
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
            />
            {emptyFields.includes('author') && <Form.Control.Feedback type="invalid">Author is required</Form.Control.Feedback>}
          </Form.Group>
  
          <Form.Group className="mb-3">
            <Form.Label>Description:</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              className={emptyFields.includes('description') || emptyFields.includes('descriptionMin') ? 'is-invalid' : ''}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            {(emptyFields.includes('description') || emptyFields.includes('descriptionMin')) && (
              <Form.Control.Feedback type="invalid">Description is required</Form.Control.Feedback>
            )}
          </Form.Group>
  
          <Button variant="primary" type="submit" className="w-100">
            Add Book
          </Button>
  
          {error && <Alert variant="danger" className="mt-3">{error}</Alert>}
        </Form>
      </Container>
    )
}

export default BookForm