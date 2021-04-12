import mongoose from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";

const UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    // avataURL은 fileURL과 같이 동작
    avatarUrl: String,
    githubId: Number,
    kakaoId: Number
});

// passportLocalMongoose가 체크를 하는 역할을 대신해준다.
UserSchema.plugin(passportLocalMongoose, {usernameField: "email"});


const model = mongoose.model("User", UserSchema);

export default model;