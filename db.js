import mongoose from 'mongoose';
import dotenv from 'dotenv';
// env안에 있는 정보를 불러올 수 있다.
dotenv.config();

// 아래에서 요청하는 건 String으로 된 Database이며 어디에 Database가 저장되어 있는 지 알려준다.
mongoose.connect(
    // port를 확인하는 방법은 cmd창에 mongod를 입력하여 나오는 정보를 가지고 확인.
    // mongoDB의 URL을 dotenv로 숨겼다.
    process.env.MONGO_URL,
    {
        useNewUrlParser: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
    },
);

const db = mongoose.connection;

// 성공 여부를 알 수 있는 함수
const handleOpen = () => console.log('Connected to DB');
const handleError = (error) => console.log(`Error on DB Connection:${error}`);

db.once('open', handleOpen);
db.on('error', handleError);