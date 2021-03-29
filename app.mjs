import 'core-js';
import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
// import bodyParser from "body-parser";
import userRouter from './routes/userRouter.mjs';
import videoRouter from './routes/videoRouter.mjs';
import globalRouter from './routes/globalRouter.mjs';
import routes from './routes.mjs';
import { localsMiddleware } from './middlewares.mjs';

const app = express();

// application이 안전하게 도와줌
app.use(helmet());
app.set('view engine', 'pug');
// express.static()은 directory에서 file을 보내주는 middleware이다. file만 확인함.
app.use('/uploads', express.static('uploads'));
app.use('/static', express.static('static'));
app.use(cookieParser());
// 웹 사이트로전달하는 정보를 검사
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// application을 이용한 모든 log를 출력
app.use(morgan('dev'));
app.use((req, res, next) => {
    res.setHeader('Content-Security-Policy', "script-src 'self' http://archive.org");
    return next();
});
app.use(localsMiddleware);

app.use(routes.home, globalRouter);
app.use(routes.users, userRouter);
app.use(routes.videos, videoRouter);

export default app;