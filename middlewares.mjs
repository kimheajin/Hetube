import multer from 'multer';
import routes from './routes.mjs';

const multerVideo = multer({ dest: 'uploads/videos/' });

export const localsMiddleware = (req, res, next) => {
    res.locals.siteName = 'WeTube';
    res.locals.routes = routes;
    res.locals.user = {
        isAuthenticated: true,
        id: 1,
    };
    next();
};

export const uploadVideo = multerVideo.single('videoFile');
// local변수에 접근하기 위해 localsmiddleware를 사용한다.


// multer : function을 넣으면 URL을 반환해준다.