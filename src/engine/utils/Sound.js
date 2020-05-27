export default class Sound {
  constructor(url) {
    this.audio = new Audio();
    this.audio.src = url;
    this.audio.load();
    this.playing = false;
    this.initEvent();
  }

  initEvent() {
    this.audio.addEventListener('canplay', () => {
      this.time = this.audio.duration;
    });

    this.audio.addEventListener('ended', () => {
      this.playing = false;
    });
  }

  play() {
    this.playing = true;

    // scratchjr
    // 第一次播放会因为用户没有触发点击报错，延迟执行
    if (this.isPlayed) {
      this.audio.play();
    } else {
      setTimeout(() => {
        this.isPlayed = true; // 标记是否是第一次播放
        this.audio.play();
      }, 100);
    }
  }

  // 返回true/false
  done() {
    return !this.playing;
  }

  clear() {
    this.playing = false;
  }

  stop() {
    this.audio.pause();
  }
}
