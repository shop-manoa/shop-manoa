import { Card, CardBody, CardLink, CardSubtitle, CardText, CardTitle, Col } from 'react-bootstrap';
import React from 'react';

const ItemListing = ({ stuff }) => (
  <Col xs={2}>
    <Card>
      <Card.Img src="https://www.fivebranches.edu/wp-content/uploads/2021/08/default-image.jpg" alt="#" className="img-fluid" />
      <CardBody>
        <CardTitle>{stuff.product}</CardTitle>
        <CardSubtitle>{stuff.owner}</CardSubtitle>
        <CardText>{stuff.condition}</CardText>
        <CardLink href="#">Lister profile</CardLink>
      </CardBody>
    </Card>
  </Col>
);

export default ItemListing;
