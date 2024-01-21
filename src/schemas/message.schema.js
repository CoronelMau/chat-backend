import { Schema, model } from 'mongoose';

const messageSchema = new Schema({
  user: { type: String, require: true },
  text: { type: String, require: true },
  date: { type: Date, default: Date.now },
});

const MessageModel = model('Messages', messageSchema);

export default MessageModel;
