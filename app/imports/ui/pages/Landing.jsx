import React from 'react';
import { Card, CardTitle, CardSubtitle, CardText, CardLink, Col, Container, Row, CardBody } from 'react-bootstrap';
import { CardImage } from 'react-bootstrap-icons';

/* A simple static component to render some text for the landing page. */
const Landing = () => (
  <Container id="landing-page" fluid className="py-3">
    <Row className="align-middle">
      <Col xs={5} className="5">
        <Card className="mx-5">
          <Card.Img src="https://www.fivebranches.edu/wp-content/uploads/2021/08/default-image.jpg" alt="#" className="img-fluid" />
          <CardBody>
            <CardTitle>Item listed</CardTitle>
            <CardSubtitle>Lister info</CardSubtitle>
            <CardText>Item description</CardText>
            <CardLink href="#">Lister profile</CardLink>
          </CardBody>
        </Card>
      </Col>

      <Col xs={7} className="d-flex flex-column justify-content-center">
        <h1>What is Shop Manoa?</h1>
        <p>Shop Manoa is a marketplace designed by and for University of Hawaii at Manoa students and faculty to facilitate the buying and selling of various student-related goods and services.</p>
        <h1>How do I use Shop Manoa?</h1>
        <p>TBD</p>
      </Col>

    </Row>
  </Container>
);

export default Landing;
