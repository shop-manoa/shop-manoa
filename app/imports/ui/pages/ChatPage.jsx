// ChatPage.jsx

import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useParams } from 'react-router-dom'; // Add useParams hook to access URL parameters

const ChatPage = () => {
  const { chatId } = useParams(); // Get the chatId from URL params

  return (
    <Container>
      <Row>
          <Col>
            <h2>Chat Page</h2>
            <p>Chat ID: {chatId}</p> {/* Display the chatId */}
            {/* Add chat functionality here */}
          </Col>
        </Row>
      </Container>
  );
};

export default ChatPage;