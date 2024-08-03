import { useState } from 'react'
import { useLogin } from '../hooks/useLogin'
import { Container, Form, Button, Row, Col, Alert } from 'react-bootstrap'

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const {login, error, isLoading} = useLogin()

    const handleSubmit = async (e) => {
        e.preventDefault()

        await login(email, password)
    }
    return (
        <Container className="mt-4">
            <Row className="justify-content-center">
                <Col md={6}>
                    <Form className="p-4 border rounded shadow-sm" onSubmit={handleSubmit}>
                        <h3 className="text-center mb-4">Log In</h3>
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
                            <Form.Label>Password:</Form.Label>
                            <Form.Control
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </Form.Group>

                        <Button variant="primary" type="submit" className="w-100" disabled={isLoading}>
                            {isLoading ? 'Logging in...' : 'Log In'}
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    )
}

export default Login