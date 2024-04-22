import React from 'react';
import { Image, Col, Row, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

/** The Footer appears at the bottom of every page. Rendered by the App Layout component. */
const Footer = () => (
  <footer className="mt-auto py-3 bg-light">
    {/* You can change the color whatever you think it fits */}
    <Container>
      <Row>
        {/* Make 4 Cols 1)Logo, 2)Menu, and 3)website info */}
        <Col className="justify-content-sm-start">
          <Image roundedCircle src="/images/uhLogo.png" width="130px" />
          {/*  Another choice for logo: <Image src="/images/uhLogo2.jpg" className="img-fluid" /> */}
        </Col>
        <Col className="justify-content-md-center">
          <Col className="py-md-1"><Link to="/home">Home</Link></Col>
          <Col className="py-md-1"><Link to="/list">Seller Profiles</Link></Col>
          <Col className="py-md-1"><Link to="/items">Items</Link></Col>
          <Col className="py-md-1"><Link to="/adminHome">Admin</Link></Col>
        </Col>
        <Col className="justify-content-lg-end">
          <h3>Shop Manoa</h3>
          <p>__A brief info here__</p>
        </Col>
      </Row>
    </Container>
  </footer>
);

export default Footer;
