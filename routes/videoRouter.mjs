import express from 'express';
import routes from '../routes.mjs';
import {
    deleteVideo, getEditVideo, getUpload, postEditVideo, postUpload, videoDetail,
} from '../controllers/videoController.mjs';

import { uploadVideo } from '../middlewares.mjs';

const videoRouter = express.Router();
// const만 있는 것은 export 되지 않고 이것처럼 앞에 "export"를 입력해주어야 익스포트 된다.

// Upload
videoRouter.get(routes.upload, getUpload);
videoRouter.post(routes.upload, uploadVideo, postUpload);

// Video Detail
videoRouter.get(routes.videoDetail(), videoDetail);

// Edit Video
videoRouter.get(routes.editVideo(), getEditVideo);
videoRouter.post(routes.editVideo(), postEditVideo);

videoRouter.get(routes.deleteVideo(), deleteVideo);

export default videoRouter;