import React from 'react';
import { Container, Row } from 'react-bootstrap';
import ItemListing from '../components/ItemListing';

/* A simple static component to render some text for the landing page. */
const UserHome = () => (
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

export default UserHome;
