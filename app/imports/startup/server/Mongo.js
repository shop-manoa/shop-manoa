import { Meteor } from 'meteor/meteor';
import { ItemsList } from '../../api/items/ListItems';
import { Profiles } from '../../api/user/Profiles.js';
import { CategoryStuffs } from '../../api/category/CategoryStuff';
import { Reports } from '../../api/report/Report.js';
import { Ratings } from '../../api/rating/Ratings.js';

/* eslint-disable no-console */

// Initialize the database with a default data document.
const addData = (data) => {
  console.log(`  Adding: ${data.name} (${data.owner})`);
  ItemsList.collection.insert(data);
};

// Initialize the StuffsCollection if empty.
if (ItemsList.collection.find().count() === 0) {
  if (Meteor.settings.defaultData) {
    console.log('Creating default data.');
    Meteor.settings.defaultData.forEach(data => addData(data));
  }
}

const addProfiles = (profile) => {
  console.log(`  Adding: ${profile.lastName} (${profile.owner})`);
  const newProfile = Profiles.collection.insert(profile);
  console.log(`  Adding rating to id: ${newProfile} (${profile.owner})`);
  Ratings.collection.insert({ userProfileID: newProfile });
};

// Initialize the StuffsCollection if empty.
if (Profiles.collection.find().count() === 0) {
  if (Meteor.settings.defaultProfile) {
    console.log('Creating default profile.');
    Meteor.settings.defaultProfile.forEach(profile => addProfiles(profile));
  }
}

// Initialize the StuffsCollection if empty.
if (Profiles.collection.find().count() === 0) {
  if (Meteor.settings.defaultProfile) {
    console.log('Creating default profile.');
    Meteor.settings.defaultProfile.forEach(profile => addProfiles(profile));
  }
}

const addCategory = (category) => {
  console.log(`  Adding: ${category.name} (${category.owner})`);
  CategoryStuffs.collection.insert(category);
};

if (CategoryStuffs.collection.find().count() === 0) {
  if (Meteor.settings.defaultCategories) {
    console.log('Creating default Category');
    Meteor.settings.defaultCategories.forEach(category => addCategory(category));
  }
}

const addReport = (report) => {
  console.log(`  Adding: ${report.types} ${report.category} (${report.owner})`);
  Reports.collection.insert(report);
};

if (Reports.collection.find().count() === 0) {
  if (Meteor.settings.defaultReport) {
    console.log('Creating default report');
    Meteor.settings.defaultReport.forEach(report => addReport(report));
  }
}

// Method to toggle favorite status for an item
// Add error handling to the 'items.toggleFavorite' method in Mongo.js
Meteor.methods({
  'items.toggleFavorite'(itemId) {
    check(itemId, String);
    if (!this.userId) {
      throw new Meteor.Error('not-authorized', 'You are not authorized to perform this action');
    }
    const item = ItemsList.collection.findOne(itemId);
    if (!item) {
      throw new Meteor.Error('item-not-found', 'Item not found');
    }
    const userId = this.userId;
    const isFavorited = item.favoritedBy.includes(userId);
    try {
      if (isFavorited) {
        ItemsList.collection.update(itemId, { $pull: { favoritedBy: userId } });
      } else {
        ItemsList.collection.update(itemId, { $addToSet: { favoritedBy: userId } });
      }
    } catch (error) {
      throw new Meteor.Error('toggle-favorite-error', 'Error toggling favorite');
    }
  },
});

