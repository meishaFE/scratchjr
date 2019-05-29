import { isAndroid } from './lib';
import Sound from './Sound';
import Project from '../editor/ui/Project';

////////////////////////////////////////////////////
/// Sound Playing
////////////////////////////////////////////////////

let uiSounds = {};
let projectSounds = {};

export default class ScratchAudio {
  static get uiSounds() {
    return uiSounds;
  }

  static get projectSounds() {
    return projectSounds;
  }

  static sndFX(name) {
    // ScratchAudio.sndFXWithVolume(name, 1.0);
  }

  /**
   * mscodejr
   * 删除了默认音效
   */
  static init() {
    ScratchAudio.addSound('pop.mp3', '/static/scratchjr/pop.mp3', projectSounds);
  }

  static addSound(name, url, dict, fcn) {
    dict[name] = new Sound(url);

    if (fcn) {
      fcn(name);
    }
  }

  static soundDone(name) {
    if (!projectSounds[name]) return;
    projectSounds[name].playing = false;
  }

  static loadProjectSound(md5, fcn) {
    if (!md5 || !Project.files[md5]) {
      return;
    }
    ScratchAudio.addSound(md5, Project.files[md5], projectSounds, fcn);
  }
}

window.ScratchAudio = ScratchAudio;
