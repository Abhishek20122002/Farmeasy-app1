import React, { useEffect, useState } from 'react';
import { Card, Button, Spinner, Alert, Container } from 'react-bootstrap';
import { getAllNotifications, getNotificationById } from '../../services/notificationService';

const NotificationListPage = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchNotifications = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await getAllNotifications();
      setNotifications(data);
    } catch (err) {
      console.error('Error fetching notifications:', err);
      setError('Failed to load notifications. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (id) => {
    try {
      await getNotificationById(id); // Your endpoint marks as read when fetched
      fetchNotifications(); // Refresh list
    } catch (err) {
      console.error('Failed to mark as read:', err);
      setError('Could not mark the notification as read.');
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  return (
    <Container className="py-4">
      <h2 className="mb-4">Your Notifications</h2>

      {loading ? (
        <div className="d-flex justify-content-center my-5">
          <Spinner animation="border" role="status" variant="primary">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      ) : error ? (
        <Alert variant="danger">{error}</Alert>
      ) : notifications.length === 0 ? (
        <Alert variant="info">No notifications found.</Alert>
      ) : (
        notifications.map((notification) => (
          <Card
            key={notification.id}
            className={`mb-3 shadow-sm ${
              notification.read ? 'bg-light' : 'bg-white'
            }`}
          >
            <Card.Body>
              <div className="d-flex justify-content-between align-items-start">
                <div>
                  <Card.Title>{notification.title}</Card.Title>
                  <Card.Text>{notification.message}</Card.Text>
                  <small className="text-muted">
                    {new Date(notification.timestamp).toLocaleString()}
                  </small>
                </div>
                {!notification.read && (
                  <Button
                    variant="outline-primary"
                    size="sm"
                    onClick={() => markAsRead(notification.id)}
                  >
                    Mark as Read
                  </Button>
                )}
              </div>
            </Card.Body>
          </Card>
        ))
      )}
    </Container>
  );
};

export default NotificationListPage;
