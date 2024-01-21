import { jwtVerify } from 'jose';

const userJWTDTO = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) res.status(401).send('1. User not authorized');

  const jwt = authorization.split(' ')[1];

  if (!jwt) return res.status(201).send('2. User not authorized');

  try {
    const encoder = new TextEncoder();
    const { payload } = await jwtVerify(
      jwt,
      encoder.encode(process.env.JWT_PRIVATE_KEY)
    );

    req.id = payload.id;
    next();
  } catch (err) {
    console.log(err);
    return res.status(201).send('User not authorized');
  }
};

export default userJWTDTO;
