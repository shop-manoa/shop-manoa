import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

export const Chats = new Mongo.Collection('chats');

Meteor.methods({
  'chats.createChat'(participantId) {
    if (!this.userId) {
      throw new Meteor.Error('not-authorized', 'User not authorized to create chat');
    }
    const chat = Chats.findOne({ participants: { $all: [this.userId, participantId] } });
    if (chat) {
      return chat._id;
    } else {
      return Chats.insert({ participants: [this.userId, participantId], messages: [] });
    }
  },
  'chats.sendMessage'(chatId, message) {
    if (!this.userId) {
      throw new Meteor.Error('not-authorized', 'User not authorized to send message');
    }
    Chats.update({ _id: chatId }, { $push: { messages: { userId: this.userId, message: message, timestamp: new Date() } } });
  },
});
