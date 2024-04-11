import React from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { AutoForm, ErrorsField, LongTextField, SubmitField, SelectField } from 'uniforms-bootstrap5';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import { Reports } from '../../api/report/Report';

// Create a schema to specify the structure of the data to appear in the form.
const formSchema = new SimpleSchema({
  types: {
    type: String,
    allowedValues: ['Post', 'User'],
    defaultValue: 'Post',
  },
  category: {
    type: String,
    allowedValues: [
      'Spam',
      'Sexual conduct',
      'Hate speech or discriminatory symbols',
      'Abuse or dangerous groups',
      'Sale of illegal or regulated goods',
      'Bullying or harassment',
      'Infringement of intellectual property rights',
      'Suicide or self-harm',
      'False information',
      'Others'],
    defaultValue: 'Others',
  },
  details: String,
});

const bridge = new SimpleSchema2Bridge(formSchema);


/* Renders the CreateItem page for adding a document. */
const AddStuff = () => {

/* Renders the AddReport page for adding a document. */
const AddReport = () => {

  // On submit, insert the data.
  const submit = (data, formRef) => {
    const { types, category, details } = data;
    const owner = Meteor.user().username;
    Reports.collection.insert(
      { types, category, details, owner },
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
        <Col xs={5}>
          <Col className="text-center"><h2>Add Report</h2></Col>
          <AutoForm ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => submit(data, fRef)}>
            <Card>
              <Card.Body>
                <SelectField name="types" />
                <SelectField name="category" />
                <LongTextField name="details" />
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

export default AddReport;
