import express from 'express';
import { signup, Login, userDetail, logOut } from '../controller/user.controller.js';
import {authMiddleware} from '../middleware/authMiddleware .middleware.js'

const userRouter = express.Router();

// POST request for signup
userRouter.post('/user/signup', signup);

// POST request for login
userRouter.post('/user/login', Login);

// GET request for details
userRouter.get('/user/details', authMiddleware, userDetail);

// GET request for logout
userRouter.get('/user/logout', authMiddleware, logOut);



export default userRouter;
