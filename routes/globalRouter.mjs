import express from 'express';
import {
    getJoin, getLogin, postJoin, logout, postLogin,
} from '../controllers/userController.mjs';
import { home, search } from '../controllers/videoController.mjs';
import routes from '../routes.mjs';

const globalRouter = express.Router();

globalRouter.get(routes.join, getJoin);
globalRouter.post(routes.join, postJoin);

globalRouter.get(routes.login, getLogin);
globalRouter.post(routes.login, postLogin);

globalRouter.get(routes.logout, logout);

globalRouter.get(routes.home, home);
globalRouter.get(routes.search, search);

export default globalRouter;