class videoLoader {

  constructor(url) {
    this.video = document.createElement('video');
  
    this.videoReady = false;
    this.playing = false;
    this.timeupdate = false;
  
    this.video.autoplay = true;
    this.video.muted = true;
    this.video.loop = true;
  
    // Waiting for these 2 events ensures there is data in the video
  
    this.video.addEventListener('playing', () => {
       this.playing = true;
       checkReady();
    }, true);
  
    this.video.addEventListener('timeupdate', () => {
       this.timeupdate = true;
       checkReady();
    }, true);
  
    this.video.src = url;
    this.video.play();
  
    const checkReady = () => {
      if (this.playing && this.timeupdate) {
        this.videoReady = true;
      }
    };
  }

}

export default videoLoader;
