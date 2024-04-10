import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

/**
 * The ReportsCollection.
 * It encapsulates state and variable values for users.
 * It stores the info of the inappropriate users.
 */
class ReportsCollection {
  constructor() {
    // The name of this collection.
    this.name = 'ReportsCollection';
    // Define the Mongo collection.
    this.collection = new Mongo.Collection(this.name);
    // Define the structure of each document in the collection.
    this.schema = new SimpleSchema({
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
      owner: String,
    });
    // Attach the schema to the collection, so all attempts to insert a document are checked against schema.
    this.collection.attachSchema(this.schema);
    // Define names for publications and subscriptions
    this.userPublicationName = `${this.name}.publication.user`;
    this.adminPublicationName = `${this.name}.publication.admin`;
  }
}

/**
 * The singleton instance of the ReportsCollection.
 * @type {ReportsCollection}
 */
export const Reports = new ReportsCollection();
