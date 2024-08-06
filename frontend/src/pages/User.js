// User.js
import React, { useState, useContext } from 'react';
import { Container, Alert, Row, Col, Button, Form, Modal } from 'react-bootstrap';
import { AuthContext } from '../context/AuthContext';  // Adjust path as necessary

const User = () => {
  const { user, dispatch } = useContext(AuthContext);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [newUsername, setNewUsername] = useState('');

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleSaveChanges = async () => {
    try {
      const storedUser = JSON.parse(localStorage.getItem('user'));

      const response = await fetch('/api/users/users/me', {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${storedUser.token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username: newUsername })
      });
      const data = await response.json();
      if (response.ok) {
        dispatch({ type: 'LOGIN', payload: data });  // Update context with new user data
        localStorage.setItem('user', JSON.stringify(data));  // Update localStorage
      } else {
        setError(data.error || 'Failed to update user');
      }
    } catch (error) {
      setError('Failed to make changes');
    }

    handleCloseModal();
  };

  if (!user && !error) {
    return <div>Loading...</div>;
  }

  return (
    <Container className="mb-4 shadow-sm">
      <Row>
        <Col>
          <h2>User Profile</h2>
          {error ? (
            <Alert variant="danger">{error}</Alert>
          ) : (
            <>
              <p>
                <strong>Username:</strong> {user.username}
                <span className="material-symbols-outlined" onClick={handleShowModal} style={{ cursor: 'pointer', marginLeft: '10px' }}>
                  Edit
                </span>
              </p>
              <p>
                <strong>Email:</strong> {user.email}
              </p>
              <p><strong>ID:</strong> {user._id}</p>
            </>
          )}
        </Col>
      </Row>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter new username"
                value={newUsername}
                onChange={(e) => setNewUsername(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSaveChanges}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default User;
