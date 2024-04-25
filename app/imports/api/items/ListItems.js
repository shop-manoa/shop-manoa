import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

class ListItems {
  constructor() {
    this.name = 'ItemsList';
    this.collection = new Mongo.Collection(this.name);
    this.schema = new SimpleSchema({
      title: String,
      description: String,
      image: String,
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
      owner: String,
    });
    this.collection.attachSchema(this.schema);
    this.userPublicationName = `${this.name}.publication.user`;
    this.adminPublicationName = `${this.name}.publication.admin`;
  }

  insert(item) {
    this.schema.validate(item);
    return this.collection.insert(item);
  }
}

export const ItemsList = new ListItems();
