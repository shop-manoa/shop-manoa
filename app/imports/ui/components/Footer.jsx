import React from 'react';
import { Image, Col, Row, Container } from 'react-bootstrap';

/** The Footer appears at the bottom of every page. Rendered by the App Layout component. */
const Footer = () => (
  <footer className="mt-auto py-3 bg-light">
    <Container>
      <Row>
        {/* Make 3 Cols 1)Logo, 2)Menu, and 3)website info */}
        <Col className="justify-content-lg-start">
          <Image roundedCircle src="/images/uhLogo.png" width="130px" />
        </Col>
        <Col className="text-content">
          Department of Information and Computer Sciences
          {' '}
          <br />
          University of Hawaii
          <br />
          Honolulu, HI 96822
          {' '}
          <br />
          <a href="http://ics-software-engineering.github.io/meteor-application-template-react">
            Template Home
            Page
          </a>
        </Col>
        <Col className="justify-content-lg-end">
          <Image src="/images/uhLogo2.jpg" className="img-fluid" />
        </Col>
      </Row>
    </Container>
  </footer>
);

export default Footer;
