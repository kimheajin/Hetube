import routes from '../routes';
import Video from '../models/Video';
// import { Error } from "mongoose";

// javascript의 특징은 어떠한 작업을 할 시 그 작업이 끝날 때 까지 기다리지 않고 다른작업을 시작하는 것이다.(한번에 많은일을 할 수 있음.)
// 때문에 기다림이 필요한 작업인 경우 아래의 기능을 통해 기다리게 할 수 있다. 
// async : javascript에게 이 function의 이 부분은 꼭 기다리라고 할 수있다.
export const home = async(req, res) => {
    // await는 반드시 async안에서만 사용할 수 있다.
    // error를 자세히 잡기 위해서는 try, catch를 써야한다. 
    // nodejs는 error를 발견하면 아무런 조취를 취하지 않고 error발생 Line만 출력하기 때문에 
    // error를 자세히 잡아야 할 필요가 있다.
    try{
        // find({})는 데이터베이스에 있는 모든 비디오를 가져온다.
        // -1을 주는 것은 위 아래의 순서를 바꾸겠다는 약속 같은 것.
        const videos = await Video.find({}).sort({ _id: -1 });
        
        res.render('home', { pageTitle: 'Home', videos });
    } catch(error) {
        console.log(error);
        res.render('home', { pageTitle: 'Home', videos: [] });
    }
};
export const search = async(req, res) => {
    // req.query == {query}와 같다.
    // 아래 코드는 이것과 같다.-> const searchingBy = req.query.term; (ES6이전방식)
    const {
        query: { term: searchingBy },
    } = req;
    // let으로 정의한 변수는 값을 바꿀 수 있고, const로 정의한 함수는 값을 바꿀 수 없다.
    // 아래의 videos가 req의 요구에 맞는 값을 찾지 못한다면, videos는 계속 빈 값이다.
    // 아래의 videos가 req의 요구에 맞는 값을 찾았다면, videos의 빈 값은 req값과 일치하는 데이터로 덮어씌워질 것이다.
    let videos = [];
    try{
        // i는 insensitive의 약자로 덜 민감하다는 의미(대소문자 구분 안함)
        videos = await Video.find({ title: { $regex: searchingBy, $options: 'i' } });
    }catch(error) {
        console.log(error);
    }
    res.render('search', { pageTitle: 'Search', searchingBy, videos });
};

export const getUpload = (req, res) => res.render('upload', { pageTitle: 'Upload' });
export const postUpload = async(req, res) => {
    // multer에서 준 file path = 새로운 비디오 fileUrl 연결

    const { 
        body: { title, description }, 
        file: { path }, 
    } = req;
    console.log(path);
    const newVideo = await Video.create({
        fileUrl: path,
        title,
        description,
    });

    console.log(newVideo);
    // To Do : Upload and save video
    res.redirect(routes.videoDetail(newVideo.id));
};
export const videoDetail = async(req, res) => {
    const{
        params: { id },
    } = req;
    try{
        const video = await Video.findById(id);
        res.render('videoDetail', { pageTitle: `${video.title}`, video }); // video는 video: video 와 같다.
    }catch(error) {
        res.redirect(routes.home);
    }
};

export const getEditVideo = async(req, res) => {
    const {
        params: { id },
    } = req;

    try{
        const video = await Video.findById(id);
        res.render('editVideo', { pageTitle: `Edit ${video.title}`, video });
    }catch(error) {
        console.log(error);
        res.redirect(routes.home);
    }
};

export const postEditVideo = async(req, res) => {
    const{
        params: { id },
        body: { title, description },
    } = req;
    try{
        // 새로운 변수로 저장하고 싶지 않기에 await를 사용하여 데이터를 가져오지 못하게 한다??
        // 아래와 같이 title , description이라고 쓰는 것은, title: title, description: description과 같은 의미이다.
        // 때문에 model을 설정할 때에는 오브젝트명과 데이터명을 같이 해주는 것이 깔끔하다.
        // 사용하는 데이터들은 모두 연결성을 주는 것이 좋다.
        await Video.findOneAndUpdate({ _id: id }, { title, description });
        res.redirect(routes.videoDetail(id));
    }catch(error) {
        res.redirect(routes.home);
    }
};

export const deleteVideo = async(req, res) => {
    const{
        params: { id },
    } = req;
    try{
        await Video.findOneAndDelete({ _id: id });
    }catch(error) {
        console.log(error);
    }
    res.redirect(routes.home);
};