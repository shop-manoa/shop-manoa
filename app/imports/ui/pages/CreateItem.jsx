import React, { useState } from 'react';
import { Card, Col, Container, Row, Form, Image, CardTitle } from 'react-bootstrap';
import { AutoForm, ErrorsField, LongTextField, NumField, SelectField, SubmitField, TextField } from 'uniforms-bootstrap5';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import { ItemsList } from '../../api/items/ListItems';

const formSchema = new SimpleSchema({
  title: String,
  image: {
    type: String,
    optional: true,
  },
  description: String,
  category: {
    type: String,
    allowedValues: ['Electronics', 'Transportation', 'Furniture', 'Books', 'Services', 'Other'],
    defaultValue: 'Electronics',
  },
  condition: {
    type: String,
    allowedValues: ['Excellent', 'Good', 'Fair', 'Poor'],
    defaultValue: 'Good',
  },
  price: Number,
  contact: String,
});

const bridge = new SimpleSchema2Bridge(formSchema);

const CreateItem = () => {
  const [imageUrl, setImageUrl] = useState('');

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const submit = (data, formRef) => {
    const { title, description, category, condition, price, contact } = data;
    const owner = Meteor.user()?.username;

    if (!owner) {
      swal('Error', 'User not logged in', 'error');
      return;
    }

    if (imageUrl) {
      // No need to store the file, just the URL
      ItemsList.collection.insert(
        { title, image: imageUrl, description, category, condition, price, contact, owner },
        (insertError) => {
          if (insertError) {
            swal('Error', insertError.message, 'error');
          } else {
            swal('Success', 'Item added successfully', 'success');
            formRef.reset();
            setImageUrl('');
          }
        },
      );
    } else {
      swal('Error', 'Please select an image file', 'error');
    }
  };

  return (
    <Container id="createitem-page" className="py-3">
      <Row className="justify-content-center">
        <Col xs={7}>
          <AutoForm schema={bridge} onSubmit={submit}>
            <Card>
              <CardTitle className="text-center pt-2" style={{ fontSize: '30px' }}>Create Item</CardTitle>
              <Card.Body>
                <TextField id="createItemFormTitle" name="title" />
                <Form.Group>
                  <Form.Label>Upload Image</Form.Label>
                  <Form.Control id="createItemFormImage" type="file" onChange={handleFileChange} />
                  {imageUrl && (
                    <Image src={imageUrl} alt="Uploaded" style={{ width: '100px', height: '100px' }} />
                  )}
                </Form.Group>
                <LongTextField id="createItemFormDescription" name="description" />
                <SelectField id="createItemFormCategory" name="category" />
                <SelectField id="createItemFormCondition" name="condition" />
                <NumField id="createItemFormPrice" name="price" decimal={null} />
                <TextField id="createItemFormContact" name="contact" placeholder="Please enter valid email or phone number" />
                <SubmitField id="createItemFormSubmit" value="Submit" />
                <ErrorsField />
              </Card.Body>
            </Card>
          </AutoForm>
        </Col>
      </Row>
    </Container>
  );
};

export default CreateItem;
