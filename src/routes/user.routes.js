import { Router } from 'express';

import chatAccessController from '../controllers/chat-access.controller.js';
import userRegisterController from '../controllers/user-register.controller.js';
import userLoginController from '../controllers/user-login.controller.js';
import userProfileController from '../controllers/user-profile.controller.js';
import userJWTDTO from '../controllers/user-jwt.dto.js';

const userRouter = Router();

userRouter.get('/chat', userJWTDTO, chatAccessController);
userRouter.post('/register', userRegisterController);
userRouter.post('/login', userLoginController);
userRouter.get('/profile', userJWTDTO, userProfileController);

export default userRouter;
