import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { Stuffs } from '../../api/stuff/Stuff';
import { Profiles } from '../../api/user/Profiles';
import { CategoryStuffs } from '../../api/category/CategoryStuff';
import { Reports } from '../../api/report/Report';
import { Ratings } from '../../api/rating/Ratings';
import { ItemsList } from '../../api/items/ListItems';

// User-level publication.
// If logged in, then publish documents owned by this user. Otherwise, publish nothing.
Meteor.publish(Stuffs.userPublicationName, function () {
  if (this.userId) {
    const username = Meteor.users.findOne(this.userId).username;
    return Stuffs.collection.find({ owner: username });
  }
  return this.ready();
});

Meteor.publish(Profiles.userPublicationName, function () {
  if (this.userId) {
    return Profiles.collection.find();
  }
  return this.ready();
});

Meteor.publish(CategoryStuffs.userPublicationName, function () {

  return CategoryStuffs.collection.find();

});

Meteor.publish(Ratings.userPublicationName, function () {
  if (this.userId) {
    return Ratings.collection.find();
  }
  return this.ready();
});

Meteor.publish(ItemsList.userPublicationName, function () {
  if (this.userId) {
    return ItemsList.collection.find();
  }
  return this.ready();
});

// Admin-level publication.
// If logged in and with admin role, then publish all documents from all users. Otherwise, publish nothing.
Meteor.publish(Stuffs.adminPublicationName, function () {
  if (this.userId && Roles.userIsInRole(this.userId, 'admin')) {
    return Stuffs.collection.find();
  }
  return this.ready();
});

Meteor.publish(Reports.adminPublicationName, function () {
  if (this.userId && Roles.userIsInRole(this.userId, 'admin')) {
    return Reports.collection.find();
  }
  return this.ready();
});

Meteor.publish(ItemsList.adminPublicationName, function () {
  if (this.userId) {
    return ItemsList.collection.find();
  }
  return this.ready();
});

// alanning:roles publication
// Recommended code to publish roles for each user.
Meteor.publish(null, function () {
  return Ratings.collection.find();
});

Meteor.publish(null, function () {
  return Profiles.collection.find();
});

Meteor.publish(null, function () {
  return ItemsList.collection.find();
});

Meteor.publish(null, function () {
  if (this.userId) {
    return Meteor.roleAssignment.find({ 'user._id': this.userId });
  }
  return this.ready();
});
