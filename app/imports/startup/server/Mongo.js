import { Meteor } from 'meteor/meteor';
import { Stuffs } from '../../api/stuff/Stuff.js';
import { Profiles } from '../../api/user/Profiles.js';
import { Ratings } from '../../api/rating/Ratings.js';

/* eslint-disable no-console */

// Initialize the database with a default data document.
const addData = (data) => {
  console.log(`  Adding: ${data.name} (${data.owner})`);
  Stuffs.collection.insert(data);
};

// Initialize the StuffsCollection if empty.
if (Stuffs.collection.find().count() === 0) {
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
