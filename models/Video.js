import mongoose from 'mongoose';
// model = 실제 데이터 , schema = shema형태

// VideoSchema의 정의를 아래에 기재
// Video는 데이터에 저장되지 않는다. link가 저장된다. (Database가 무거워지기 때문.)
const VideoSchema = new mongoose.Schema({
    // type : fileURL의 타입이다. required : 파일읽기를 실패했을 경우의 메시지.
    fileUrl: {
        type: String,
        required: 'File URL is required',
    },
    title: {
        type: String,
        required: 'Title is required',
    },
    // default가 0인 이유는 제일 처음 생성했을 때의 뷰 값을 설정하기 위해.
    description: String,
    Views: {
        type: Number,
        default: 0,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Comment',
        },
    ],
    creator: {
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }
});

// VideoSchema라는 변수를 mongoose의 model에 담으며, model이라는 변수를 export한다.
const model = mongoose.model('Video', VideoSchema);
export default model;
