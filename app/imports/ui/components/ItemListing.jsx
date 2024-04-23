import { Card, CardBody, CardLink, CardSubtitle, CardText, CardTitle, Col } from 'react-bootstrap';
import React from 'react';
import { Link } from 'react-router-dom';

const ItemListing = () => (
  <Col xs={2}>
    <Card>
      <Card.Img src="https://www.fivebranches.edu/wp-content/uploads/2021/08/default-image.jpg" alt="#" className="img-fluid" />
      <CardBody>
        <CardTitle>Item listed</CardTitle>
        <CardSubtitle>Lister info</CardSubtitle>
        <CardText>Item description</CardText>
        <CardLink href="#">Lister profile</CardLink>
        {/* Added a link to AddReport page */}
        <Link to="../addReport" className="btn btn-outline-danger btn-sm custom-button" style={{ marginLeft: '10px' }}>report</Link>
      </CardBody>
    </Card>
  </Col>
);

export default ItemListing;
