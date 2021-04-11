import express from 'express';
import routes from '../routes';
import {
    deleteVideo, getEditVideo, getUpload, postEditVideo, postUpload, videoDetail,
} from '../controllers/videoController';

import { onlyPrivate, uploadVideo } from '../middlewares';

const videoRouter = express.Router();
// const만 있는 것은 export 되지 않고 이것처럼 앞에 "export"를 입력해주어야 익스포트 된다.

// Upload
videoRouter.get(routes.upload, onlyPrivate, getUpload);
videoRouter.post(routes.upload, onlyPrivate, uploadVideo, postUpload);

// Video Detail
videoRouter.get(routes.videoDetail(), videoDetail);

// Edit Video
videoRouter.get(routes.editVideo(), onlyPrivate, getEditVideo);
videoRouter.post(routes.editVideo(), onlyPrivate, postEditVideo);

videoRouter.get(routes.deleteVideo(), onlyPrivate, deleteVideo);

export default videoRouter;