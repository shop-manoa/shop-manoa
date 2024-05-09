// ChatPage.jsx

import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

const ChatPage = () => {
  const { chatId } = useParams();

  // State to store messages for the chat
  const [messages, setMessages] = useState([]);

  // State to store the current message being typed
  const [newMessage, setNewMessage] = useState('');

  // Function to handle sending a message
  const sendMessage = () => {
    if (newMessage.trim() !== '') {
      setMessages([...messages, { text: newMessage, sender: 'user' }]);
      setNewMessage('');
    }
  };

  return (
    <Container className="bg-white p-4">
      <Row>
        <Col>
          <h2>Chat Page</h2>
          <p>Chat ID: {chatId}</p>
          {/* Render messages */}
          {messages.map((message, index) => (
            <div key={index} className={`message ${message.sender === 'user' ? 'user-message' : 'other-message'}`}>
              {message.text}
            </div>
          ))}
          {/* Input field and send button */}
          <Form onSubmit={(e) => { e.preventDefault(); sendMessage(); }}>
            <Form.Group>
              <Form.Control
                type="text"
                placeholder="Type your message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
              />
            </Form.Group>
            <Button type="submit">Send</Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default ChatPage;
