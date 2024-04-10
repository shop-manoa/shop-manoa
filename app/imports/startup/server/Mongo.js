import { Meteor } from 'meteor/meteor';
import { Stuffs } from '../../api/stuff/Stuff.js';
import { Reports } from '../../api/report/Report.js';

/* eslint-disable no-console */

// Initialize the database with a default data document.
const addData = (data) => {
  console.log(`  Adding: ${data.name} (${data.owner})`);
  Stuffs.collection.insert(data);
};

const addReport = (report) => {
  console.log(`  Adding: ${report.types} ${report.category} (${report.owner})`);
  Reports.collection.insert(report);
};

// Initialize the StuffsCollection if empty.
if (Stuffs.collection.find().count() === 0) {
  if (Meteor.settings.defaultData) {
    console.log('Creating default data.');
    Meteor.settings.defaultData.forEach(data => addData(data));
  }
}

if (Reports.collection.find().count() === 0) {
  if (Meteor.settings.defaultReport) {
    console.log('Creating default report');
    Meteor.settings.defaultReport.forEach(report => addReport(report));
  }
}
