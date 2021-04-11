import express from 'express';
import passport from "passport";
import {
    getJoin, getLogin, postJoin, logout, postLogin, githubLogin, postGithubLogin
} from '../controllers/userController';
import { home, search } from '../controllers/videoController';
import { onlyPrivate, onlyPublic } from '../middlewares';
import routes from '../routes';

const globalRouter = express.Router();

// 아래의 라우터로 들어갈 시 postJoin을 호출, postJoin의next()함수를 읽고, postLogin으로 넘어간다.
globalRouter.get(routes.join, onlyPublic, getJoin);
globalRouter.post(routes.join, onlyPublic, postJoin, postLogin);

globalRouter.get(routes.login, getLogin);
globalRouter.post(routes.login, postLogin);

globalRouter.get(routes.logout, onlyPrivate, logout);
globalRouter.get(routes.home, home);
globalRouter.get(routes.search, search);

// 누군가 auth/github으로 들어와 인증을 요구할 시 githubLogin을 써서 인증을 한다.
// 아래의 인증이 완료되면 passport.js에 정의한 callbackURL로 돌아가게 된다.

// github로 갈 때 githubLogin이 실행된다. (이것은 userContorller에 있다.)
globalRouter.get(routes.Github, githubLogin);
// github사이트에서 인증을 하여 redirect_uri로 오게되었을 때 다음 함수인 githubLoginCallback를 실행시킨다.
globalRouter.get(
    routes.GithubCallback, 
    // user를 찾게 된다면, passport는 인증을 통과시키며 postGithubLogin을 실행시키고, 쿠키를 만들어서 저장해 준다.
    // 만약 user를 찾지 못한다면 passport는 login화면으로 redirect를 시켜준다. 
    passport.authenticate('github', { failureRedirect: '/login' }),
    postGithubLogin
);

export default globalRouter;