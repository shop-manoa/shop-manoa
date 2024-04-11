import React from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { AutoForm, ErrorsField, LongTextField, NumField, SelectField, SubmitField, TextField } from 'uniforms-bootstrap5';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import { Stuffs } from '../../api/stuff/Stuff';

// Create a schema to specify the structure of the data to appear in the form.
const formSchema = new SimpleSchema({
  title: String,
  description: String,
  image: String,
  category: {
    type: String,
    allowedValues: ['Electronics', 'Transportation', 'Furniture', 'Books', 'Services'],
    defaultValue: 'Electronics',
  },
  condition: {
    type: String,
    allowedValues: ['Excellent', 'Good', 'Fair', 'Poor'],
    defaultValue: 'Good',
  },
  price: Number,
});

const bridge = new SimpleSchema2Bridge(formSchema);

/* Renders the CreateItem page for adding a document. */
const CreateItem = () => {

  // On submit, insert the data.
  const submit = (data, formRef) => {
    const { title, description, image, category, condition, price } = data;
    const owner = Meteor.user().username;
    Stuffs.collection.insert(
        { title, description, image, category, condition, price, owner },
        (error) => {
          if (error) {
            swal('Error', error.message, 'error');
          } else {
            swal('Success', 'Item added successfully', 'success');
            formRef.reset();
          }
        },
    );
  };

  // Render the form. Use Uniforms: https://github.com/vazco/uniforms
  let fRef = null;
  return (
      <Container className="py-3">
        <Row className="justify-content-center">
          <Col xs={7}>
            <Col className="text-center"><h2>Create Item</h2></Col>
            <AutoForm ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => submit(data, fRef)}>
              <Card>
                <Card.Body>
                  <TextField name="title" />
                  <LongTextField name="description" />
                  <TextField name="image" />
                  <SelectField name="category" />
                  <SelectField name="condition" />
                  <NumField name="price" decimal={null} />
                  <SubmitField value="Submit" />
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
