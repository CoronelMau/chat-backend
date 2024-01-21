import { compare } from 'bcrypt';
import { SignJWT } from 'jose';

import UserModel from '../schemas/user.schema.js';

const userLoginController = async (req, res) => {
  const { user, password } = req.body;

  const existingByName = await UserModel.findOne({ user }).exec();
  if (!existingByName) return res.status(400).send('User not authorized');

  const checkPwd = await compare(password, existingByName.password);
  if (!checkPwd) return res.status(400).send('User not authorized');

  const jwtConstructor = new SignJWT({ id: existingByName.id });
  const encoder = new TextEncoder();

  const jwt = await jwtConstructor
    .setProtectedHeader({ alg: 'HS256', type: 'JWT' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(encoder.encode(process.env.JWT_PRIVATE_KEY));

  return res.send({ jwt });
};

export default userLoginController;
