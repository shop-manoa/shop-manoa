import React from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { AutoForm, ErrorsField, TextField, LongTextField, SubmitField, SelectField } from 'uniforms-bootstrap5';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import { Reports } from '../../api/report/Report';
import { Profiles } from '../../api/user/Profiles';
import { ItemsList } from '../../api/items/ListItems';

// Create a schema to specify the structure of the data to appear in the form.
const formSchema = new SimpleSchema({
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  title: {
    type: String,
    optional: true,
  },
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

/* Renders the AddReport page for adding a document. */
const AddReport = () => {
  // On submit, insert the data.
  const submit = (data, formRef) => {
    const { firstName, lastName, title, types, category, details } = data;
    const owner = Meteor.user().username;
    let targets;
    if (types === 'Post') {
      targets = ItemsList.collection.find({ title: title }, { _id: 1 }).fetch();
    } else {
      targets = Profiles.collection.find({ firstName: firstName, lastName: lastName }, { _id: 1 }).fetch();
    }
    const target_id = targets.length > 0 ? targets[0]._id : '-Not Found-';

    Reports.collection.insert(
      { firstName, lastName, title, target_id, types, category, details, owner },
      (error) => {
        if (error) {
          swal('Error', error.message, 'error');
        } else {
          swal('Success', 'The report is successfully submitted', 'success');
          formRef.reset();
        }
      },
    );
  };
  // Render the form. Use Uniforms: https://github.com/vazco/uniforms
  let fRef = null;
  return (
    <Container id="addreport-page" className="py-3">
      <Row className="justify-content-center">
        <Col xs={5}>
          <Col className="text-center"><h2>Add Report</h2></Col>
          <AutoForm ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => submit(data, fRef)}>
            <Card>
              <Card.Body>
                <TextField name="firstName" placeholder="N/A" />
                <TextField name="lastName" placeholder="N/A" />
                <TextField name="title" placeholder="N/A" />
                <SelectField id="addReportFormTypes" name="types" />
                <SelectField id="addReportFormCategory" name="category" />
                <LongTextField id="addReportFormDetails" name="details" />
                <SubmitField id="addReportFormSubmit" value="Submit" />
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
