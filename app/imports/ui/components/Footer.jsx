import React from 'react';
import { Image, Col, Row, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

/** The Footer appears at the bottom of every page. Rendered by the App Layout component. */
const Footer = () => (
  <footer className="mt-auto py-3 bg-light" style={{ position: 'relative', bottom: '0', width: '100%' }}>
    {/* You can change the color whatever you think it fits */}
    <Container>
      <Row>
        {/* Make 4 Cols 1)Logo, 2)Menu, and 3)website info */}
        <Col>
          <Image roundedCircle src="/images/uhLogo.png" width="130px" />
          {/*  Another choice for logo: <Image src="/images/uhLogo2.jpg" className="img-fluid" /> */}
        </Col>
        <Col>
          <Col className="py-md-1"><Link to="/list">Sellers</Link></Col>
          <Col className="py-md-1"><Link to="/items">Items</Link></Col>
        </Col>
        <Col>
          <Col className="py-md-1"><Link to="/home">Home</Link></Col>
          <Col className="py-md-1"><Link to="/profile/:owner">Account</Link></Col>
        </Col>
        <Col>
          <h4 className="text-center">Shop Manoa</h4>
          <p className="text-sm-center py-0">
            Well come to Shop-Manoa! We are a platform for UH students to buy and sell items.
          </p>
          <p className="text-sm-center py-0">
            University of Hawaii at Manoa, Honolulu, HI 96822
          </p>
        </Col>
      </Row>
    </Container>
  </footer>
);

export default Footer;
