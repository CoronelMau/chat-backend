import { hash } from 'bcrypt';
import { v4 as uuid } from 'uuid';

import UserModel from '../schemas/user.schema.js';

const userRegisterController = async (req, res) => {
  const { user, password } = req.body;

  const existingByName = await UserModel.findOne({ user }).exec();

  if (existingByName)
    return res.status(209).send({ message: 'User already exists!' });

  const hashPwd = await hash(password, 12);

  if (!existingByName) {
    const newUser = new UserModel({
      _id: uuid(),
      user,
      password: hashPwd,
    });

    await newUser.save();

    return res.status(200).send({
      message: 'User registered!',
    });
  }
};

export default userRegisterController;
