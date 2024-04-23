import React from 'react';
import { useParams } from 'react-router-dom';
// PlaceHolder for the Categories Tab
const Categories = () => {
  const { _name } = useParams();
  return (
    <div style={{ fontSize: '50px' }}>
      Now showing post {_name}
    </div>
  );
  // const { _id } = useParams();

  // Posts.find({id:Meteor.userId()}).fetch()[0].title
  // const subscription = Meteor.subscribe(CategoryStuffs.userPublicationName);
  // Determine if the subscription is ready
  // Get the document
  // const document = CategoryStuffs.collection.findOne(_id);
  // const pog = CategoryStuffs.collection.findOne(_id);
  // const test = pog.CategoryStuffs().name();
  // return <div>{_id} WTF</div>;
};
// Fiqure Out how to get the name of the Category

export default Categories;
