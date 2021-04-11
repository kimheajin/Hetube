import mongoose from 'mongoose';

const CommentSchema = new mongoose.Schema({
    // 무언가 줄 옵션이 필요할 경우 두줄로, 필요없을 경우 변수 : 값 만 해도 된다.
    text: {
        type: String,
        required: 'Text is required',
    },
    createAt: {
        type: Date,
        default: Date.now(),
    },
    video: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Video',
    },
});

const model = mongoose.model('Comment', CommentSchema);

export default model;