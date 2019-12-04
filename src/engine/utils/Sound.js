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
    this.audio.play();
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
