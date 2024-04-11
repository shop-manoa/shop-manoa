import React from 'react';
import ItemListing from '../components/ItemListing';
import { Container, Row } from 'react-bootstrap';

/* A simple static component to render some text for the landing page. */
const UserHome = () => {
  return (
    <Container fluid className="pt-3">
      <Row>
        <ItemListing />
        <ItemListing />
        <ItemListing />
        <ItemListing />
        <ItemListing />
        <ItemListing />
      </Row>
    </Container>
  );
};

export default UserHome;
