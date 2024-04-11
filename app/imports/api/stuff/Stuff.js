import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { number } from 'prop-types';

/**
 * The StuffsCollection. It encapsulates state and variable values for stuff.
 */
class StuffsCollection {
  constructor() {
    // The name of this collection.
    this.name = 'StuffsCollection';
    // Define the Mongo collection.
    this.collection = new Mongo.Collection(this.name);
    // Define the structure of each document in the collection.
    this.schema = new SimpleSchema({
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
    // Attach the schema to the collection, so all attempts to insert a document are checked against schema.
    this.collection.attachSchema(this.schema);
    // Define names for publications and subscriptions
    this.userPublicationName = `${this.name}.publication.user`;
    this.adminPublicationName = `${this.name}.publication.admin`;
  }

  // Method to insert data into the StuffsCollection
  insertData(data) {
    this.collection.insert(data);
  }
}

/**
 * The singleton instance of the StuffsCollection.
 * @type {StuffsCollection}
 */
export const Stuffs = new StuffsCollection();
