import passport from "passport";
import GitHubStrategy from "passport-github";
import { githubLoginCallback } from "./controllers/userController";
import User from "./models/User";
import routes from "./routes";

//strategy는 로그인 방식을 말한다. 아래에서 로그인 방식을 설정함.
// passport로 사용자를 인증할 수 있는 코드가 아래 3줄이다.
passport.use(User.createStrategy());
// Userid를 담고
// github사이트에서 인증을 하여 redirect_uri로 오게되었을 때 다음 함수인 githubLoginCallback를 실행시킨다.(해당 함수는 userController에 있다.)
passport.use(
    new GitHubStrategy(
        {
            clientID: process.env.GH_ID,
            clientSecret: process.env.GH_SECRET,
            redirect_uri: `http://localhost:4000/${routes.GithubCallback}`
        },
        githubLoginCallback
    ),
    
)

// 담은 id를 식별한다.
passport.serializeUser(function (user, done) {
    done(null, user);
});
    
passport.deserializeUser(function (user, done) {
    done(null, user);
});


// serialization : 어떤 정보를 쿠키에게 주는가
// - 지금 웹브라우저(클라이언트)에 있는 사용자에 대해서 어떤 정보를 가질 수 있느냐
// - 쿠키에 있는 정보는 자동으로 백엔드에 전송된다.
// - serialization은 어떤 field가 쿠키에 포함될 것인지 전해주는 역할을 한다.
// - 쿠키에게는 너무 많은 정보를 주지 말 것.

// deserializeUser : 어떤 사용자인지 어떻게 찾는가
// - 쿠키에게서 정보를 받았을 때 id : 1이라는 정보일 시 이 정보를 어떻게 사용자로 전환하는가

// 이러한 기능들은 지름길에 속하는데, 보통 이러한 함수로 쿠키 및 로그인기능을 시행한다.
