// MessagesPage.jsx - Displaying chats

import React from 'react';
import { Container, Row, Col, ListGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const MessagesPage = ({ chats }) => {
  return (
    <Container>
      <Row>
        <Col>
          <h2>Messages</h2>
          <ListGroup>
            {chats.map(chat => (
              <ListGroup.Item key={chat.id}>
                <Link to={`/chat/${chat.id}`}>{chat.participant}</Link>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
      </Row>
    </Container>
  );
};

export default MessagesPage;
