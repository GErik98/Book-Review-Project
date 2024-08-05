import React, { useEffect, useState } from 'react';
import { Container, Alert, Row, Col } from 'react-bootstrap';

const User = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const storedUser = JSON.parse(localStorage.getItem('user'));
      if (storedUser && storedUser.token) {
        try {
          const response = await fetch('/api/users/users/me', {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${storedUser.token}`,
              'Content-Type': 'application/json'
            }
          });
          const data = await response.json();

          if (response.ok) {
            setUser(data);
          } else {
            setError(data.error || 'Failed to fetch user data');
          }
        } catch (err) {
          setError('Failed to fetch user data');
        }
      } else {
        setError('User is not logged in');
      }
    };

    fetchUser();
  }, []);

  if (!user && !error) {
    return <div>Loading...</div>;
  }

  return (
    <Container>
      <Row>
        <Col>
          <h2>User Profile</h2>
          {error ? (
            <Alert variant="danger">{error}</Alert>
          ) : (
            <>
              <p><strong>Username:</strong> {user.username}</p>
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>ID:</strong> {user._id}</p>
            </>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default User;
