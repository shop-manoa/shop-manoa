import { Meteor } from 'meteor/meteor';
import { ItemsList } from './ListItems';

Meteor.methods({
  'items.toggleFavorite'(itemId, favorited) {
    // Ensure the user is logged in before allowing them to toggle favorites
    if (!Meteor.userId()) {
      throw new Meteor.Error('not-authorized', 'You must be logged in to toggle favorites.');
    }

    // Update the item's favorited status
    ItemsList.collection.update(
      { _id: itemId },
      { $set: { favoritedBy: favorited ? Meteor.user().username : null } },
    );
  },
});
