import 'core-js';
import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import { localsMiddleware } from './middlewares';
import passport from "passport";

import session from "express-session";
import MongoStore from "connect-mongo";
import routes from './routes';
import userRouter from './routes/userRouter';
import videoRouter from './routes/videoRouter';
import globalRouter from './routes/globalRouter';

import "./passport";

import path from "path";

const app = express();

// application이 안전하게 도와줌
app.use(helmet());
app.set('view engine', 'pug');
// express.static()은 directory에서 file을 보내주는 middleware이다. file만 확인함.
app.use('/uploads', express.static('uploads'));
app.use('/static', express.static(path.join(__dirname, 'static')));
app.use(cookieParser());
// 웹 사이트로전달하는 정보를 검사
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// application을 이용한 모든 log를 출력
app.use(morgan('dev'));
app.use((req, res, next) => {
    res.setHeader('Content-Security-Policy', "script-src 'self' http://archive.org");
    return next();
});
// cookieParser의 밑에 정의하는 이유는, 쿠키로 정보를 찾은 뒤 passport를 초기화하고, 
// passport가 스스로 자신의 쿠키를 들여다봐서 그 쿠키의 정보에 해당하는 사용자를 찾아줌
// store을 통해 몽고DB랑 연결한 후 서버가 재기동 되어도 DB에 있는 쿠키로 이용자를 찾아주게 한다.
app.use(
    session({
        secret: process.env.COOCIE_SECRET,
        resave: true,
        saveUninitialized: false,
        store: MongoStore.create({ mongoUrl: process.env.MONGO_URL })
    })
);

app.use(passport.initialize());
app.use(passport.session());
// 이후 아래의 미들웨어를 통해 자기가 찾은 사용자를 요청의 object즉, req.user로 만들어줌.
app.use(localsMiddleware);

app.use(routes.home, globalRouter);
app.use(routes.users, userRouter);
app.use(routes.videos, videoRouter);
    
export default app;