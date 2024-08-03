import { useState } from 'react'
import { Container, Form, Button, Row, Col, Alert } from 'react-bootstrap'

import { useSignup } from '../hooks/useSignup'

const Signup = () => {
    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const {signup, error, isLoading} = useSignup()

    const handleSubmit = async (e) => {
        e.preventDefault()

        await signup(email, username, password)
    }
    return (
        <Container className="mt-4">
            <Row className="justify-content-center">
                <Col md={6}>
                    <Form className="p-4 border rounded shadow-sm" onSubmit={handleSubmit}>
                        <h3 className="text-center mb-4">Sign Up</h3>
                        {error && <Alert variant="danger">{error}</Alert>}
                        <Form.Group className="mb-3">
                            <Form.Label>Email:</Form.Label>
                            <Form.Control
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Username:</Form.Label>
                            <Form.Control
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Password:</Form.Label>
                            <Form.Control
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </Form.Group>

                        <Button variant="primary" type="submit" className="w-100" disabled={isLoading}>
                            {isLoading ? 'Signing Up...' : 'Sign Up'}
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    )
}

export default Signup