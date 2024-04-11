import SimpleSchema from 'simpl-schema';

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