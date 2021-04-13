import passport from "passport";
import routes from '../routes';
import User from "../models/User";

export const getJoin = (req, res) => {
    res.render('join', { pageTitle: 'Join' });
};

export const postJoin = async (req, res, next) => {
    const{
        body: { name, email, password, password2},
    } = req;
    if(password !== password2) {
        res.status(400);
        res.render('join', { pageTitle: 'Join' });
    }else{
        try{
            const user = await User({
                name,
                email
            });
            await User.register(user, password);
            next();
        }
        catch(error){
            console.log(error);
            res.redirect(routes.home);
        }   
    }
};

export const getLogin = (req, res) => res.render('login', { pageTitle: 'Login' });
export const postLogin = passport.authenticate('local',{
    failureRedirect: routes.login,
    successRedirect: routes.home
});

export const logout = (req, res) => {
    req.logout();
    res.redirect(routes.home);
  };

// 이것은 깃헙사이트로 보내주는 역할을 한다.
export const githubLogin = passport.authenticate('github');


// 사용하지 않는 파라메터는 _, __, ___식으로 생략 혹은 제외시킨다.

export const githubLoginCallback = async(_, __, profile, cb) => {
    const {
        _json: { id, avatar_url: avatarUrl, login:name }
    } = profile;
    try{
        const user = await User.findOne({id});
        if(user){
            user.githubId = id;
            user.save();
            return cb(null, user);
        }
        const newUser = await User.create({
            name: profile._json.login,
            githubId: id,
            avatarUrl: profile._json.avatar_url,

        });
        return cb(null, newUser);
    }catch(error){
        return cb(error);
    }
}
export const postGithubLogin = (req, res) => {
    res.redirect(routes.home);
}

// /oauth/kakao로 로그인 요청
export const KakaoLogin = passport.authenticate('kakao');

// /oauth/kakao/callback으로 프로필 반환
export const kakaoLoginCallback = async(_, __, profile, done) => {
    
    const {
        id,
        username: name,
        _json: {
          properties: { profile_image }
        },
    } = profile;
    try{
        const user = await User.findOne({ id });
        if(user){
            user.kakaoId = id;
            user.save();
            return done(null, user);
        }else {
            const newUser = await User.create({
                name: profile.username,
                kakaoId: id,
                avatarUrl: profile._json.properties.profile_image,
            });
            return done(null, newUser);
        }
    }catch(error){
        return done(error);
    }
}

export const postKakaoLogin = (req, res) => {
    res.redirect(routes.home);
}


export const getMe = (req, res) => {
    // userDitail페이지는 user라는 object를 전달받음
    res.render('userDetail', { pageTitle: 'User Detail' , user: req.user});
}

// export const users = (req, res) => res.render('users', { pageTitle: 'Users' });
export const userDetail = async(req, res) => {
    console.log(req);
    const { params: {id} } = req;
    try{
        const user = await User.findById(id);
        res.render('userDetail', { pageTitle: 'User Detail' , user});
    }catch(error){
        res.redirect(routes.home);
    }
};
export const editProfile = (req, res) => res.render('editProfile', { pageTitle: 'Edit Profile' });
export const changePassword = (req, res) => res.render('changePassword', { pageTitle: 'Change Password' });