import React from 'react';
import { Image, Col, Row, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaHome, FaUser, FaList, FaShoppingCart } from 'react-icons/fa'; // Import icons

/** The Footer appears at the bottom of every page. Rendered by the App Layout component. */
const Footer = () => (
  <footer className="mt-auto py-1" style={{ position: 'relative', width: '100%', backgroundColor: '#f8f9fa' }}>
    {/* You can change the color whatever you think it fits */}
    <Container>
      <Row className="justify-content-md-center text-center py-1">
        <Col xs={6} md={2} className="mb-1 mb-md-0 d-flex align-items-center justify-content-center">
          <Image roundedCircle src="/images/uhLogo.png" width="130px" />
        </Col>
        <Col xs={6} md={2} className="mb-1 mb-md-0 d-flex align-items-center justify-content-center">
          <Link to="/list" style={{ color: 'inherit', textDecoration: 'inherit' }}><h5><FaList className="mb-1" /> Sellers</h5></Link>
        </Col>
        <Col xs={6} md={2} className="mb-1 mb-md-0 d-flex align-items-center justify-content-center">
          <Link to="/items" style={{ color: 'inherit', textDecoration: 'inherit' }}><h5><FaShoppingCart className="mb-1" /> Items</h5></Link>
        </Col>
        <Col xs={6} md={2} className="mb-1 mb-md-0 d-flex align-items-center justify-content-center">
          <Link to="/home" style={{ color: 'inherit', textDecoration: 'inherit' }}><h5><FaHome className="mb-1" /> Home</h5></Link>
        </Col>
        <Col xs={6} md={2} className="mb-1 mb-md-0 d-flex align-items-center justify-content-center">
          <Link to="/profile/:owner" style={{ color: 'inherit', textDecoration: 'inherit' }}><h5><FaUser className="mb-1" /> Account</h5></Link>
        </Col>

        <Col xs={6} md={2}>
          <h5 className="text-center" style={{ paddingTop: '20px' }}>© 2024 Shop Manoa</h5>
          <p className="text-sm-center py-0">
            University of Hawaii at Manoa, Honolulu, HI 96822
          </p>
        </Col>

      </Row>
    </Container>
  </footer>
);

export default Footer;
