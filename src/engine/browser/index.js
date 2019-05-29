export default {
  database_stmt(param) {
    console.log('database_stmt');
    console.log(param);
    return 1;
  },

  database_query(param) {
    console.log('database_query');
    console.log(param);
    return 1;
  },

  io_cleanassets(param) {
    console.log('io_cleanassets');
    console.log(param);
  },

  io_getmedialen(file, key) {
    console.log('io_getmedialen');
    return 1;
  },

  io_getmediadata() {
    console.log('io_getmediadata');
    return 1;
  },

  io_getsettings() {
    console.log('io_getsettings');
    return 1;
  },

  io_getmediadone() {
    console.log('io_getmediadone');
    return 1;
  },

  io_setmedia() {
    console.log('io_setmedia');
    return 1;
  },

  io_setmedianame() {
    console.log('io_setmedianame');
    return 1;
  },

  io_getmd5() {
    console.log('io_getmd5');
    return 1;
  },

  io_remove() {
    console.log('io_remove');
    return 1;
  },

  io_getfile() {
    console.log('io_getfile');
    return 1;
  },

  io_setfile() {
    console.log('io_setfile');
    return 1;
  },

  io_registersound() {
    console.log('io_registersound');
    return 1;
  },

  io_playsound() {
    console.log('io_playsound');
    return 1;
  },

  io_stopsound() {
    console.log('io_stopsound');
    return 1;
  },

  recordsound_recordstart() {
    console.log('recordsound_recordstart');
    return 1;
  },

  recordsound_recordstop() {
    console.log('recordsound_recordstop');
    return 1;
  },

  recordsound_volume() {
    console.log('recordsound_volume');
    return 1;
  },

  recordsound_startplay() {
    console.log('recordsound_startplay');
    return 1;
  },

  recordsound_stopplay() {
    console.log('recordsound_stopplay');
    return 1;
  },

  recordsound_recordclose() {
    console.log('recordsound_recordclose');
    return 1;
  },

  askForPermission() {
    console.log('askForPermission');
    return 1;
  },

  scratchjr_startfeed() {
    console.log('scratchjr_startfeed');
    return 1;
  },

  scratchjr_stopfeed() {
    console.log('scratchjr_stopfeed');
    return 1;
  },

  scratchjr_choosecamera() {
    console.log('scratchjr_choosecamera');
    return 1;
  },

  scratchjr_captureimage() {
    console.log('scratchjr_captureimage');
    return 1;
  },

  hideSplash() {
    console.log('hideSplash');
    return 1;
  },

  sendSjrUsingShareDialog() {
    console.log('sendSjrUsingShareDialog');
    return 1;
  },

  deviceName() {
    console.log('deviceName');
    return 1;
  },

  analyticsEvent() {
    console.log('analyticsEvent');
    return 1;
  }
};
