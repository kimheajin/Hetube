// const로 정의한 것은 값을 바꿀 수 없다 만약 값을 바꾸고 싶다면(함수 안에서 변수를 사용하고 싶다면)let으로 정의해야한다.
const videoContainer = document.getElementById("jsVideoPlayer");
const videoPlayer = videoContainer.querySelector("#jsVideoPlayer video");
const playBtn = document.getElementById("jsPlayButton");
const volumeBtn = document.getElementById("jsVolumeButton");
const fullScrBtn = document.getElementById("jsFullScreen");

function handlePlayClick(){
    if(videoPlayer.paused){
        videoPlayer.play();
        playBtn.innerHTML = '<i class="fas fa-pause"></i>';
    }else{
        videoPlayer.pause();
        playBtn.innerHTML = '<i class="fas fa-play"></i>';
    }
}
// innerHTML은 프로퍼티
// method는 element에서 제공하는 함수


//fullScreen종료 후 실행하는 함수
function exitFullScreen(){
    fullScrBtn.innerHTML = '<i class="fas fa-expand"></i>';
    fullScrBtn.addEventListener("click",goFullScreen);
    document.webkitExitFullscreen();
}

// 아직 fullscreen으로 바꿔주는 함수는 없다. 하지만 이벤트 리스너를 바꾸면 해당 기능을 구현할 수 있다.
function goFullScreen(){
    // videoContainer의 elements를 바꿔주어야한다. videoPlayer의 경우, 이벤트가 제대로 적용되지 않는다.
    // 이유는 대상에서 벗어나기 때문에(video기능에 관해서만 수정이 되기 때문에)적용에 누락이 발생하기 때문이다.
    videoContainer.webkitRequestFullscreen();
    fullScrBtn.innerHTML = '<i class="fas fa-compress"></i>';
    fullScrBtn.removeEventListener("click",goFullScreen);
    fullScrBtn.addEventListener("click",exitFullScreen);
}

function handleVolumeClick(){
        // 소리 없음 상태를 해제한다.
    if(videoPlayer.muted){
        videoPlayer.muted=false;
        volumeBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
    }else{
        // 소리 없음 상태로 바꾼다.
        videoPlayer.muted=true;
        volumeBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
    }
}

// init에서 addEventListener를 하는 것은 유저가 이 페이지에 있는것을 체크하기 위해서이다.
function init(){
    playBtn.addEventListener("click", handlePlayClick);
    volumeBtn.addEventListener("click", handleVolumeClick);
    fullScrBtn.addEventListener("click",goFullScreen);
}   

if(videoContainer){
    init();
}