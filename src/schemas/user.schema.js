import { Schema, model } from 'mongoose';

const userSchema = new Schema({
  _id: { type: String, _id: false },
  user: { type: String, require: true },
  password: { type: String, require: true },
});

const UserModel = model('User', userSchema);

export default UserModel;
