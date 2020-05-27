import Project from './ui/Project';
import ScratchAudio from '../utils/ScratchAudio';
import Paint from '../painteditor/Paint';
import Prims from './engine/Prims';
import Undo from './ui/Undo';
import Alert from './ui/Alert';
import Palette from './ui/Palette';
import UI from './ui/UI';
import Menu from './blocks/Menu';
import Grid from './ui/Grid';
import ScriptsPane from './ui/ScriptsPane';
import Events from '../utils/Events';
import BlockSpecs from './blocks/BlockSpecs';
import Runtime from './engine/Runtime';
import { libInit, gn, newHTML, isTablet, CSSTransition3D, frame } from '../utils/lib';

let workingCanvas = document.createElement('canvas');
let workingCanvas2 = document.createElement('canvas');
let activeFocus = undefined;
// Our behavior for story-starters are slightly different from changed
// e.g. moving a script around doesn't "start a story" while we would want it
// to save a normal user project.
let runtime = undefined;
let stage = undefined;
let inFullscreen = false;
let keypad = undefined;
let textForm = undefined;
let editfirst = false;
let stagecolor = '#F5F2F7';
let defaultSprite = 'Cat.svg';

///////////////////////////////////////////
//Layers definitions for the whole site
///////////////////////////////////////////

//layaring variables
let layerTop = 10;
let layerAboveBottom = 4;
let dragginLayer = 7000;

let projectId = undefined;
let currentProject = '60';
let editmode = 'look';

let isDebugging = false;
let time;
let userStart = false;
let onHold = false;
let shaking = undefined;
let stopShaking = undefined;
let version = 'iOSv01';

let autoSaveEnabled = true;
let autoSaveSetInterval = null;

let onBackButtonCallback = [];

export default class ScratchJr {
  static get workingCanvas() {
    return workingCanvas;
  }

  static get workingCanvas2() {
    return workingCanvas2;
  }

  static get activeFocus() {
    return activeFocus;
  }

  static set activeFocus(newActiveFocus) {
    activeFocus = newActiveFocus;
  }

  static get runtime() {
    return runtime;
  }

  static get stage() {
    return stage;
  }

  static set stage(newStage) {
    stage = newStage;
  }

  static get inFullscreen() {
    return inFullscreen;
  }

  static get stagecolor() {
    return window.Settings ? window.Settings.stageColor : stagecolor;
  }

  static get defaultSprite() {
    return defaultSprite;
  }

  static get layerTop() {
    return layerTop;
  }

  static get layerAboveBottom() {
    return layerAboveBottom;
  }

  static get dragginLayer() {
    return dragginLayer;
  }

  static get projectId() {
    return projectId;
  }

  static set projectId(val) {
    projectId = val;
  }

  static get currentProject() {
    return currentProject;
  }

  static set currentProject(val) {
    currentProject = val;
  }

  static get editmode() {
    return editmode;
  }

  static set editmode(newEditmode) {
    editmode = newEditmode;
  }

  static set time(newTime) {
    time = newTime;
  }

  static set userStart(newUserStart) {
    userStart = newUserStart;
  }

  static get onHold() {
    return onHold;
  }

  static set onHold(newOnHold) {
    onHold = newOnHold;
  }

  static get shaking() {
    return shaking;
  }

  static set shaking(newShaking) {
    shaking = newShaking;
  }

  static get stopShaking() {
    return stopShaking;
  }

  static set stopShaking(newStopShaking) {
    stopShaking = newStopShaking;
  }

  static get version() {
    return version;
  }

  static get onBackButtonCallback() {
    return onBackButtonCallback;
  }

  /**
   * mscodejr
   * 增加了projectId
   */
  static appinit(data, loadDone) {
    time = new Date() - 0;
    BlockSpecs.initBlocks();
    libInit();
    Project.init();
    ScratchAudio.init();
    Paint.init();
    Prims.init();
    runtime = new Runtime();
    Undo.init();
    ScratchJr.editorEvents();
    Project.load(data, loadDone);
    Events.init();
  }

  static clearEventAndTimer() {
    window.ontouchstart = null;
    window.ontouchmove = null;
    window.ontouchend = null;
    window.onresize = null;
    window.onmouseup = null;
    window.onmousemove = null;
    window.ontouchcancel = null;
    window.ondevicemotion = null;
    clearInterval(runtime.intervalId);
    const playerHide = document.getElementById('playerHide');
    playerHide.parentNode.removeChild(playerHide);
  }

  // Event handler for when a story is started
  // When called and enabled, this will trigger sample projects to save copies
  // Here for debugging, run-time filtering, etc.
  static storyStart(/*eventName*/) {}

  /**
   * mscodejr
   * 删除事件
   */
  static editorEvents() {
    document.ongesturestart = undefined;
    /* document.ontouchmove = function(e) {
      e.preventDefault();
    }; */
    window.ontouchstart = ScratchJr.unfocus;
    if (isTablet) {
      window.ontouchend = undefined;
    } else {
      window.onmouseup = undefined;
    }
  }

  static unfocus(evt) {
    if (Palette.helpballoon) {
      Palette.helpballoon.parentNode.removeChild(Palette.helpballoon);
      Palette.helpballoon = undefined;
    }
    if (document.forms.editable) {
      if (evt && evt.target == document.forms.editable.field) {
        return;
      } // block is being edit
    }
    if (document.forms.activetextbox) {
      if (evt && evt.target == document.forms.activetextbox.typing) {
        return;
      } // stage text box
    }
    if (document.forms.projectname) {
      if (evt && evt.target == document.forms.projectname.myproject) {
        return;
      } // infobox text box
    }
    if (document.activeElement.tagName.toLowerCase() == 'input') {
      document.activeElement.blur();
    }
    ScratchJr.clearSelection();
    ScratchJr.blur();
  }

  static clearSelection() {
    if (shaking) {
      stopShaking(shaking);
    }
  }

  static blur() {
    if (ScratchAudio.firstTime) {
      ScratchAudio.firstClick();
    }
    ScratchJr.editDone();
    Menu.closeMyOpenMenu();
  }

  static getSprite() {
    if (!stage.currentPage.currentSpriteName) {
      return undefined;
    }
    if (!gn(stage.currentPage.currentSpriteName)) {
      return undefined;
    }
    return gn(stage.currentPage.currentSpriteName).owner;
  }

  static gestureStart(e) {
    e.preventDefault();
    if (ScratchAudio.firstTime) {
      ScratchAudio.firstClick();
    }
  }

  static log() {
    if (!isDebugging) {
      return;
    }
    var len = arguments.length;
    var res = '';
    for (var i = 0; i < len - 1; i++) {
      res = res + arguments[i] + ' ';
    }
    res += arguments[len - 1];
    console.log(res); //eslint-disable-line no-console
  }

  static getTime() {
    return (new Date() - time) / 1000;
  }

  static isSampleOrStarter() {
    return editmode == 'look' || editmode == 'storyStarter';
  }
  static isEditable() {
    return editmode != 'look';
  }

  // Called when ScratchJr is brought back to focus
  // Here, we fix up some UI elements that may not have been properly shut down when the app was paused.
  // Note that on Android Lollipop and up we have much more limited
  // opportunity to save progress, etc. before the app is
  // paused, and so we just suspend the whole webview and then restore it here.
  static onResume() {
    // Re-enable autosaves
    autoSaveEnabled = true;
    autoSaveSetInterval = window.setInterval(function () {
      if (autoSaveEnabled && !onHold && !Project.saving && !UI.infoBoxOpen) {
        onHold = false;
        Alert.close();
      }
    }, window.Settings.autoSaveInterval);
  }

  static onPause() {
    autoSaveEnabled = false;
    window.clearInterval(autoSaveSetInterval);
  }

  static updateRunStopButtons() {
    var isOff = runtime.inactive();
    if (inFullscreen) {
      gn('go').className = isOff ? 'go on presentationmode' : 'go off presentationmode';
      UI.updatePageControls();
    } else {
      gn('go').className = isOff ? 'go on' : 'go off';
      Grid.updateCursor();
    }
    if (ScratchJr.getSprite()) {
      if (isOff && !inFullscreen) {
        ScratchJr.getSprite().select();
      } else {
        ScratchJr.getSprite().unselect();
      }
    }
    if (isOff && userStart) {
      stage.currentPage.updateThumb();
      //	ScratchJr.log ('total time', ScratchJr.getTime(), 'sec');
      userStart = false;
    }
  }

  static runStrips(e) {
    ScratchJr.stopStripsFromTop(e);
    ScratchJr.unfocus(e);
    ScratchJr.startGreenFlagThreads();
    userStart = true;
    //  time = (new Date()) - 0;
  }

  static startGreenFlagThreads() {
    ScratchJr.resetSprites();
    ScratchJr.startCurrentPageStrips(['onflag', 'ontouch']);
  }

  static startCurrentPageStrips(list) {
    var page = stage.currentPage.div;
    for (var i = 0; i < page.childElementCount; i++) {
      var spr = page.childNodes[i].owner;
      if (!spr) {
        continue;
      }
      if (!gn(spr.id + '_scripts')) {
        continue;
      } // text case
      ScratchJr.startScriptsFor(spr, list);
    }
  }

  static startScriptsFor(spr, list) {
    var sc = gn(spr.id + '_scripts');
    var topblocks = sc.owner.getBlocksType(list);
    for (var j = 0; j < topblocks.length; j++) {
      var b = topblocks[j];
      runtime.addRunScript(spr, b);
    }
  }

  static stopStripsFromTop(e) {
    e.preventDefault();
    e.stopPropagation();
    ScratchJr.unfocus(e);
    ScratchJr.stopStrips();
    userStart = false;
  }

  static stopStrips() {
    runtime.stopThreads();
    stage.currentPage.updateThumb();
  }

  static resetSprites() {
    stage.resetPage(stage.currentPage);
  }

  static fullScreen(e) {
    if (gn('full').className == 'fullscreen') {
      onBackButtonCallback.push(function () {
        var fakeEvent = document.createEvent('TouchEvent');
        fakeEvent.initTouchEvent();
        ScratchJr.quitFullScreen(fakeEvent);
      });

      ScratchJr.enterFullScreen(e);
    } else {
      ScratchJr.quitFullScreen(e);
    }
  }

  static displayStatus(type) {
    var ids = ['topsection', 'blockspalette', 'scripts', 'flip', 'projectinfo'];
    for (var i = 0; i < ids.length; i++) {
      if (gn(ids[i])) {
        gn(ids[i]).style.display = type;
      }
    }
  }

  static enterFullScreen(e) {
    if (onHold) {
      return;
    }
    e.preventDefault();
    e.stopPropagation();
    ScratchJr.unfocus(e);
    ScratchJr.displayStatus('none');
    inFullscreen = true;
    UI.enterFullScreen();
    document.body.style.background = 'black';
  }

  static quitFullScreen(e) {
    //  time = (new Date()) - 0;
    e.preventDefault();
    e.stopPropagation();
    ScratchJr.displayStatus('block');
    inFullscreen = false;
    UI.quitFullScreen();
    onBackButtonCallback.pop();
    document.body.style.background = 'white';
  }

  /////////////////////////////////////////
  //UI calls
  /////////////////////////////////////////

  static getActiveScript() {
    var str = stage.currentPage.currentSpriteName + '_scripts';
    return gn(str);
  }

  static getBlocks() {
    return ScratchJr.getActiveScript().owner.getBlocks();
  }

  /////////////////////////////////////////////////
  //Setup editable field

  static setupEditableField() {
    textForm = newHTML('form', 'textform', frame);
    textForm.name = 'editable';
    var ti = newHTML('input', 'textinput', textForm);
    ti.name = 'field';
    ti.onkeypress = function (evt) {
      handleKeyPress(evt);
    };
    textForm.onsubmit = function (evt) {
      submitOverride(evt);
    };
    function handleKeyPress(e) {
      var key = e.keyCode || e.which;
      if (key == 13) {
        submitOverride(e);
      }
    }
    function submitOverride(e) {
      e.preventDefault();
      e.stopPropagation();
      var input = e.target;
      input.blur();

      // Hitting enter does not trigger editDone()
      // so you need to pop the queue here.
      onBackButtonCallback.pop();
    }
    ti.maxLength = 50;
    ti.onfocus = ScratchJr.handleTextFieldFocus;
    ti.onblur = ScratchJr.handleTextFieldBlur;
  }

  /////////////////////////////////////////////////
  //Argument Clicked

  static editArg(e, ti) {
    e.preventDefault();
    e.stopPropagation();
    if (ti && ti.owner.isText()) {
      ScratchJr.textClicked(e, ti);
    } else {
      ScratchJr.numberClicked(e, ti);
    }

    onBackButtonCallback.push(function () {
      ScratchJr.editDone();
    });
  }

  static textClicked(e, div) {}

  static handleTextFieldFocus(e) {}

  static handleTextFieldBlur(e) {}

  /////////////////////////////////////////
  //Numeric keyboard
  /////////////////////////////////////////

  static setupKeypad() {
    keypad = newHTML('div', 'picokeyboard', frame);
    keypad.ontouchstart = ScratchJr.eatEvent;
    var pad = newHTML('div', 'insidekeyboard', keypad);
    for (var i = 1; i < 10; i++) {
      ScratchJr.keyboardAddKey(pad, i, 'onekey');
    }
    ScratchJr.keyboardAddKey(pad, '-', 'onekey minus');
    //  ScratchJr.keyboardAddKey (pad, undefined, 'onekey space');
    ScratchJr.keyboardAddKey(pad, '0', 'onekey');
    ScratchJr.keyboardAddKey(pad, undefined, 'onekey delete');
    //  var keym = newHTML("div", 'onkey' ,pad);
  }

  static eatEvent(e) {
    e.preventDefault();
    e.stopPropagation();
  }

  static keyboardAddKey(p, str, c) {
    var keym = newHTML('div', c, p);
    var mk = newHTML('span', undefined, keym);
    mk.textContent = str ? str : '';
    keym.ontouchstart = ScratchJr.numEditKey;
  }

  /////////////////////////////////////////////////
  //Number Clicked

  static numberClicked(e, ti) {
    var delta = activeFocus ? activeFocus.delta : 0;
    if (activeFocus && activeFocus.type == 'blockarg') {
      activeFocus.div.className = 'numfield off';
      ScratchJr.numEditDone();
    }
    var b = ti.owner; // b is a BlockArg
    activeFocus = b;
    activeFocus.delta = delta;
    b.oldvalue = ti.textContent;
    activeFocus.div.className = 'numfield on';
    keypad.className = 'picokeyboard on';
    editfirst = true;
    var p = ti.parentNode.parentNode.owner;
    if (Number(p.min) < 0) {
      ScratchJr.setMinusKey();
    } else {
      ScratchJr.setSpaceKey();
    }
    if (delta == 0) {
      ScratchJr.needsToScroll(b);
    }
  }

  static needsToScroll(b) {
    // needs scroll
    var look = ScratchJr.getActiveScript(); // look canvas
    var dx = b.daddy.div.left + b.daddy.div.offsetWidth + look.left;
    var w = window.innerWidth - keypad.offsetWidth - 10;
    var delta = dx > w ? w - dx : 0;
    if (delta < 0) {
      var transition = {
        duration: 0.5,
        transition: 'ease-out',
        style: {
          left: look.left + delta + 'px'
        },
        onComplete: function () {
          ScriptsPane.scroll.refresh();
        }
      };
      CSSTransition3D(look, transition);
    }
    activeFocus.delta = delta;
  }

  static numEditKey(e) {
    e.preventDefault();
    e.stopPropagation();
    var t = e.target;
    if (!t) {
      return;
    }
    if (t.className == '') {
      t = t.parentNode;
    }
    if (t.className != 'onekey space') {
      ScratchAudio.sndFX('keydown.wav');
    }
    var c = t.textContent;
    var input = activeFocus.input;
    if (!c) {
      if (t.parentNode.className == 'onekey delete' || t.className == 'onekey delete') {
        ScratchJr.numEditDelete();
      }
      return;
    }
    var val = input.textContent;
    if (editfirst) {
      editfirst = false;
      val = '0';
    }
    if (c == '-' && val != '0') {
      ScratchAudio.sndFX('boing.wav');
      return;
    }
    if (val == '0') {
      val = c;
    } else {
      val += c;
    }
    if (Number(val).toString() != 'NaN' && (Number(val) > 99 || Number(val) < -99)) {
      ScratchAudio.sndFX('boing.wav');
    } else {
      activeFocus.setValue(val);
    }
  }

  static setSpaceKey() {
    keypad.childNodes[0].childNodes[9].className = 'onekey space';
    keypad.childNodes[0].childNodes[9].childNodes[0].textContent = '';
  }

  static setMinusKey() {
    keypad.childNodes[0].childNodes[9].className = 'onekey minus';
    keypad.childNodes[0].childNodes[9].childNodes[0].textContent = '-';
  }

  static validateNumber(val) {
    return Number(val);
  }

  static revokeInput(val) {
    return val;
  }

  static numEditDelete() {
    var val = activeFocus.input.textContent;
    if (val.length != 0) {
      val = val.substring(0, val.length - 1);
    }
    if (val.length == 0) {
      val = '0';
    }
    activeFocus.setValue(val);
  }

  static editDone() {
    if (document.activeElement.tagName === 'INPUT') {
      document.activeElement.blur();
    }
    if (activeFocus == undefined) {
      return;
    }
    if (activeFocus.type != 'blockarg') {
      return;
    }
    if (activeFocus.isText()) {
      document.forms.editable.field.blur();
    } else {
      ScratchJr.closeNumberEdit();
      onBackButtonCallback.pop();
    }
  }

  static closeNumberEdit() {
    ScratchJr.numEditDone();
    ScratchJr.resetScroll();
    keypad.className = 'picokeyboard off';
    activeFocus.div.className = 'numfield off';
    activeFocus = undefined;
  }

  static numEditDone() {
    var val = activeFocus.input.textContent;
    if (val == '-') {
      val = 0;
    }
    if (val == '-0') {
      val = 0;
    }
    val = ScratchJr.validateNumber(val);
    var ba = activeFocus;
    activeFocus.setValue(parseFloat(val));
    ba.argValue = val;
    if (ba.daddy && ba.daddy.div.parentNode.owner) {
      var spr = ba.daddy.div.parentNode.owner.spr;
      if (spr && spr.div.parentNode) {
        var action = {
          action: 'scripts',
          where: spr.div.parentNode.owner.id,
          who: spr.id
        };
        if (ba.argValue != ba.oldvalue) {
          ScratchJr.storyStart('ScratchJr.numEditDone');
          Undo.record(action);
        }
      }
    }
  }

  static resetScroll() {
    var delta = activeFocus.delta;
    if (delta < 0) {
      var look = ScratchJr.getActiveScript(); // look canvas
      var transition = {
        duration: 0.5,
        transition: 'ease-out',
        style: {
          left: look.left - delta + 'px'
        },
        onComplete: function () {
          ScriptsPane.scroll.refresh();
        }
      };
      CSSTransition3D(look, transition);
    }
  }

  static validate(str, name) {
    var str2 = str.replace(/\s*/g, '');
    if (str2.length == 0) {
      return name;
    }
    return str;
  }

  /////////////////
  //Application on the background

  // XXX: does this ever happen?
  // I'm pretty sure this is dead code -TM
  static saveProjectState() {
    ScratchAudio.sndFX('tap.wav');
    if (frame.style.display == 'none') {
      Paint.saveEditState(() => {});
    } else {
      ScratchJr.unfocus();
      ScratchJr.stopStrips();
    }
  }

  /**
   * The functions that are invokved when the Android back button is clicked.
   * Methods are called from the rear and popped off after each invocation.
   */

  /**
   * Handles updating the UI when the Android back button is clicked.  This
   * method invokes the methods defined at {@link onBackButtonCallback}
   * if not empty, otherwise it invokes {@link ScratchJr.saveAndFlip}.  The
   * back button callback is set by UI components when they initialize a modal
   * or popup, so it is the responsibility of popup components to correctly cleanup
   * the onBackButtonCallback.
   */
  static goBack() {
    if (onBackButtonCallback.length === 0) {
      var e = document.createEvent('TouchEvent');
      e.initTouchEvent();
      e.preventDefault();
      e.stopPropagation();
    } else {
      var callbackReference = onBackButtonCallback[onBackButtonCallback.length - 1];
      callbackReference();
    }
  }
}
