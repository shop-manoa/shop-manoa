import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

/**
 * The RatingsCollection. It encapsulates state and variable values for stuff.
 */
class RatingsCollection {
  constructor() {
    // The name of this collection.
    this.name = 'RatingsCollection';
    // Define the Mongo collection.
    this.collection = new Mongo.Collection(this.name);
    // Define the structure of each document in the collection.
    this.schema = new SimpleSchema({
      userProfileID: { type: String },
      rating: { type: Array, defaultValue: [] },
      'rating.$': { type: Number },
      ratedBy: { type: Array, defaultValue: [] },
      'ratedBy.$': { type: String },
    });
    // Attach the schema to the collection, so all attempts to insert a document are checked against schema.
    this.collection.attachSchema(this.schema);
    // Define names for publications and subscriptions
    this.userPublicationName = `${this.name}.publication.user`;
    this.adminPublicationName = `${this.name}.publication.admin`;
  }
}

/**
 * The singleton instance of the RatingsCollection.
 * @type {RatingsCollection}
 */
export const Ratings = new RatingsCollection();