// controller에서 어떠한 데이터를 가지고 있다고 표현하고 싶을 땐 :과 이름을 넣으면 된다.

// Global
const HOME = '/';
const JOIN = '/join';
const LOGIN = '/login';
const LOGOUT = '/logout';
const SEARCH = '/search';

// Users
const USERS = '/users';
const USER_DETAIL = '/:id';
const EDIT_PROFILE = '/edit-profile';
const CHANGE_PASSWORD = '/change-password';
const ME = "/me";

// video
const VIDEOS = '/videos';
const UPLOAD = '/upload';
const VIDEO_DETAIL = '/:id';
const EDIT_VIDEO = '/:id/edit';
const DELETE_VIDEO = '/:id/delete';

//Github
const GITHUB = "/auth/github";
const GITHUB_CALLBACK = "/auth/github/callback";

//KakaoTalk
// auth/kakao로 로그인 요청
const KAKAO = "/oauth/kakao";
// auth/kakao/callback으로 프로필 반환
const KAKAO_CALLBACK = "/oauth/kakao/callback";

const routes = {
    home: HOME,
    join: JOIN,
    login: LOGIN,
    logout: LOGOUT,
    search: SEARCH,
    users: USERS,
    userDetail: id => {
        if(id) {
            return `/users/${id}`;
        }
        return USER_DETAIL;
    },
    editProfile: EDIT_PROFILE,
    changePassword: CHANGE_PASSWORD,
    videos: VIDEOS,
    upload: UPLOAD,
    videoDetail: (id) => {
        if(id) {
            return `/videos/${id}`;
        }
        return VIDEO_DETAIL;
    },
    editVideo: (id) => {
        if(id) {
            return `/videos/${id}/edit`;
        }
        return EDIT_VIDEO;
    },
    deleteVideo: (id) => {
        if(id) {
            return `/videos/${id}/delete`;
        }
        return DELETE_VIDEO;
    },
    Github: GITHUB,
    GithubCallback: GITHUB_CALLBACK,
    me: ME,
    Kakao: KAKAO,
    KakaoCallback: KAKAO_CALLBACK
};

export default routes;