import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { ItemsList } from '../../api/items/ListItems';
import { Profiles } from '../../api/user/Profiles';
import { CategoryStuffs } from '../../api/category/CategoryStuff';
import { Reports } from '../../api/report/Report';
import { Ratings } from '../../api/rating/Ratings';

// User-level publication for items owned by the current user.
Meteor.publish(ItemsList.userPublicationName, function () {
  if (this.userId) {
    const username = Meteor.users.findOne(this.userId).username;
    return ItemsList.collection.find({ owner: username });
  }
  return this.ready();
});

// User-level publication for user profiles.
Meteor.publish(Profiles.userPublicationName, function () {
  if (this.userId) {
    return Profiles.collection.find();
  }
  return this.ready();
});

// Publication for user's favorite items.
Meteor.publish('userFavorites', function () {
  if (this.userId) {
    const username = Meteor.users.findOne(this.userId).username;
    // Publish only necessary fields
    return ItemsList.collection.find({ favoritedBy: username }, { fields: { title: 1, description: 1, image: 1, category: 1, condition: 1, price: 1 } });
  }
  return this.ready();
});

// Publication for category stuffs.
Meteor.publish(CategoryStuffs.userPublicationName, function () {
  return CategoryStuffs.collection.find();
});

// Publication for ratings relevant to the current user.
Meteor.publish(Ratings.userPublicationName, function () {
  if (this.userId) {
    const username = Meteor.users.findOne(this.userId).username;
    return Ratings.collection.find({ ratedBy: username });
  }
  return this.ready();
});

// Admin-level publication for all items.
Meteor.publish(ItemsList.adminPublicationName, function () {
  if (this.userId && Roles.userIsInRole(this.userId, 'admin')) {
    return ItemsList.collection.find();
  }
  return this.ready();
});

// Admin-level publication for reports.
Meteor.publish(Reports.adminPublicationName, function () {
  if (this.userId && Roles.userIsInRole(this.userId, 'admin')) {
    return Reports.collection.find();
  }
  return this.ready();
});

// alanning:roles publication for roles and assignments.
Meteor.publish(null, function () {
  return Meteor.roleAssignment.find({ 'user._id': this.userId });
});
