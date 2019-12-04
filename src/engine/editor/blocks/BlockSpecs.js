import Localization from '../../utils/Localization';
import IO from '../../iPad/IO';

let loadCount = 0;

let loadassets = {};
let fontwhite = '#f2f3f2';
let fontpink = '#ff8ae9';
let fontdarkgray = '#6d6e6c';
let fontblack = '#1b2a34';
let fontyellow = '#ffdd33';
let fontdarkgreen = '#287f46';
let fontpurple = '#8f56e3';
let fontblue = '#0d50ab';
let fontred = '#c4281b';
let fontorange = '#da8540';

let fontcolors = [
  fontred,
  fontorange,
  fontyellow,
  fontdarkgreen,
  fontblue,
  fontpink,
  fontpurple,
  fontwhite,
  fontdarkgray,
  fontblack
];

let fontsizes = [16, 24, 36, 48, 56, 72];

let getshapes = [
  'LetterGet_Orange',
  'LetterGet_Red',
  'LetterGet_Yellow',
  'LetterGet_Green',
  'LetterGet_Blue',
  'LetterGet_Purple'
];
let sendshapes = [
  'LetterSend_Orange',
  'LetterSend_Red',
  'LetterSend_Yellow',
  'LetterSend_Green',
  'LetterSend_Blue',
  'LetterSend_Purple'
];

let speeds = ['speed0', 'speed1', 'speed2'];

export default class BlockSpecs {
  static get loadCount() {
    return loadCount;
  }

  static set loadCount(newLoadCount) {
    loadCount = newLoadCount;
  }

  static get fontcolors() {
    return fontcolors;
  }

  static get fontsizes() {
    return fontsizes;
  }

  static get speeds() {
    return speeds;
  }

  static initVal() {
    loadCount = 0;
    loadassets = {};
    fontwhite = '#f2f3f2';
    fontpink = '#ff8ae9';
    fontdarkgray = '#6d6e6c';
    fontblack = '#1b2a34';
    fontyellow = '#ffdd33';
    fontdarkgreen = '#287f46';
    fontpurple = '#8f56e3';
    fontblue = '#0d50ab';
    fontred = '#c4281b';
    fontorange = '#da8540';

    fontcolors = [
      fontred,
      fontorange,
      fontyellow,
      fontdarkgreen,
      fontblue,
      fontpink,
      fontpurple,
      fontwhite,
      fontdarkgray,
      fontblack
    ];

    fontsizes = [16, 24, 36, 48, 56, 72];

    getshapes = [
      'LetterGet_Orange',
      'LetterGet_Red',
      'LetterGet_Yellow',
      'LetterGet_Green',
      'LetterGet_Blue',
      'LetterGet_Purple'
    ];
    sendshapes = [
      'LetterSend_Orange',
      'LetterSend_Red',
      'LetterSend_Yellow',
      'LetterSend_Green',
      'LetterSend_Blue',
      'LetterSend_Purple'
    ];

    speeds = ['speed0', 'speed1', 'speed2'];
  }

  static initBlocks() {
    loadassets = new Object();
    BlockSpecs.loadGraphics();
    BlockSpecs.defs = BlockSpecs.setupBlocksSpecs();
    BlockSpecs.palettes = BlockSpecs.setupPalettesDef();
    BlockSpecs.categories = BlockSpecs.setupCategories();
    if (window.Settings.edition == 'PBS') {
      BlockSpecs.canvasMask = BlockSpecs.getImageFrom('/static/scratchjr/assets/ui/canvasmask', 'svg');
    } else {
      BlockSpecs.canvasMask = BlockSpecs.getImageFrom('/static/scratchjr/assets/ui/canvasmask');
    }
    if (window.Settings.edition != 'PBS') {
      BlockSpecs.projectThumb = BlockSpecs.getImageFrom('/static/scratchjr/assets/lobby/pmask');
    }
    IO.requestFromServer('/static/scratchjr/assets/balloon.svg', BlockSpecs.setBalloon);
    loadCount++;
  }

  static setBalloon(str) {
    loadCount--;
    BlockSpecs.balloon = str;
  }

  static loadGraphics() {
    BlockSpecs.mic = BlockSpecs.getImageFrom('/static/scratchjr/assets/ui/recordslot', 'svg');
    BlockSpecs.yellowStart = BlockSpecs.getImageFrom('/static/scratchjr/assets/blocks/start', 'svg');
    BlockSpecs.yellowStartH = BlockSpecs.getImageFrom('/static/scratchjr/assets/blocks/eh/startH');

    BlockSpecs.yellowCmd = BlockSpecs.getImageFrom('/static/scratchjr/assets/blocks/yellowCmd', 'svg');
    BlockSpecs.yellowCmdH = BlockSpecs.getImageFrom('/static/scratchjr/assets/blocks/eh/yellowCmdH');

    BlockSpecs.redEnd = BlockSpecs.getImageFrom('/static/scratchjr/assets/blocks/endshort', 'svg');
    BlockSpecs.redEndH = BlockSpecs.getImageFrom('/static/scratchjr/assets/blocks/eh/stopH');

    BlockSpecs.orangeCmd = BlockSpecs.getImageFrom('/static/scratchjr/assets/blocks/flow', 'svg');
    BlockSpecs.orangeCmdH = BlockSpecs.getImageFrom('/static/scratchjr/assets/blocks/eh/flowH');

    BlockSpecs.limeCmd = BlockSpecs.getImageFrom('/static/scratchjr/assets/blocks/sounds', 'svg');
    BlockSpecs.limeCmdH = BlockSpecs.getImageFrom('/static/scratchjr/assets/blocks/eh/soundsH');

    BlockSpecs.pinkCmd = BlockSpecs.getImageFrom('/static/scratchjr/assets/blocks/looks', 'svg');
    BlockSpecs.pinkCmdH = BlockSpecs.getImageFrom('/static/scratchjr/assets/blocks/eh/looksH');

    BlockSpecs.redEndLong = BlockSpecs.getImageFrom('/static/scratchjr/assets/blocks/endlong', 'svg');
    BlockSpecs.redEndLongH = BlockSpecs.getImageFrom('/static/scratchjr/assets/blocks/eh/stoplongH');

    BlockSpecs.cShape = BlockSpecs.getImageFrom('/static/scratchjr/assets/blocks/repeat');
    BlockSpecs.cShapeH = BlockSpecs.getImageFrom('/static/scratchjr/assets/blocks/eh/repeatH');

    BlockSpecs.blueCmd = BlockSpecs.getImageFrom('/static/scratchjr/assets/blocks/blueCmd', 'svg');
    BlockSpecs.blueCmdH = BlockSpecs.getImageFrom('/static/scratchjr/assets/blocks/eh/blueCmdH');

    BlockSpecs.textfieldimg = BlockSpecs.getImageFrom('/static/scratchjr/assets/misc/Text-01');
    BlockSpecs.numfieldimg = BlockSpecs.getImageFrom('/static/scratchjr/assets/misc/Number-01');
    BlockSpecs.pressbutton = BlockSpecs.getImageFrom('/static/scratchjr/assets/misc/pushbutton-01', 'svg');
    BlockSpecs.pressbuttonSmall = BlockSpecs.getImageFrom('/static/scratchjr/assets/misc/pushbutton', 'svg');
    BlockSpecs.caretrepeat = BlockSpecs.getImageFrom('/static/scratchjr/assets/blocks/caretrepeat');
    BlockSpecs.cmdS = BlockSpecs.getImageFrom('/static/scratchjr/assets/blocks/shadowCmd', 'svg');
    BlockSpecs.startS = BlockSpecs.getImageFrom('/static/scratchjr/assets/blocks/shadowStart', 'svg');
    BlockSpecs.endS = BlockSpecs.getImageFrom('/static/scratchjr/assets/blocks/shadowEndShort', 'svg');
    BlockSpecs.endLongS = BlockSpecs.getImageFrom('/static/scratchjr/assets/blocks/shadowEndLong', 'svg');
    BlockSpecs.repeatS = BlockSpecs.getImageFrom('/static/scratchjr/assets/blocks/shadowRepeat');
  }

  static getImageFrom(url, ext) {
    var img = document.createElement('img');
    img.src = url + (ext ? '.' + ext : '.png');
    if (!img.complete) {
      loadassets[img.src] = img;
      loadCount++;
      img.onload = function() {
        delete loadassets[img.src];
        loadCount--;
      };
    }
    return img;
  }

  static refreshLoading() {
    for (var key in loadassets) {
      if (loadassets[key].complete) {
        loadCount--;
      }
    }
  }

  static setupCategories() {
    return new Array(
      [
        BlockSpecs.getImageFrom('/static/scratchjr/assets/categories/StartOn', 'svg'),
        BlockSpecs.getImageFrom('/static/scratchjr/assets/categories/StartOff', 'svg'),
        window.Settings.categoryStartColor
      ],
      [
        BlockSpecs.getImageFrom('/static/scratchjr/assets/categories/MotionOn', 'svg'),
        BlockSpecs.getImageFrom('/static/scratchjr/assets/categories/MotionOff', 'svg'),
        window.Settings.categoryMotionColor
      ],
      [
        BlockSpecs.getImageFrom('/static/scratchjr/assets/categories/LooksOn', 'svg'),
        BlockSpecs.getImageFrom('/static/scratchjr/assets/categories/LooksOff', 'svg'),
        window.Settings.categoryLooksColor
      ],
      [
        BlockSpecs.getImageFrom('/static/scratchjr/assets/categories/SoundOn', 'svg'),
        BlockSpecs.getImageFrom('/static/scratchjr/assets/categories/SoundOff', 'svg'),
        window.Settings.categorySoundColor
      ],
      [
        BlockSpecs.getImageFrom('/static/scratchjr/assets/categories/FlowOn', 'svg'),
        BlockSpecs.getImageFrom('/static/scratchjr/assets/categories/FlowOff', 'svg'),
        window.Settings.categoryFlowColor
      ],
      [
        BlockSpecs.getImageFrom('/static/scratchjr/assets/categories/StopOn', 'svg'),
        BlockSpecs.getImageFrom('/static/scratchjr/assets/categories/StopOff', 'svg'),
        window.Settings.categoryStopColor
      ]
    );
  }

  static setupPalettesDef() {
    return [
      ['onflag', 'onclick', 'ontouch', 'onmessage', 'message'],
      ['forward', 'back', 'up', 'down', 'right', 'left', 'hop', 'home'],
      ['say', 'space', 'grow', 'shrink', 'same', 'space', 'hide', 'show'],
      [],
      ['wait', 'stopmine', 'setspeed', 'repeat'],
      ['endstack', 'forever']
    ];
  }

  ///////////////////////////////
  // Data Structure
  //
  // name - blocktype, icon or datastructure, blockshape, argtype, initial value, highlight, min, max, shadow
  //
  // arg types:
  // null
  // n -> number field;
  // t -> text field
  // m  --> image menu with argvalue equal to name;
  // d --> image menu with argvalue equal to number;
  // c -- > color drop down
  // s --> sound name
  // p --> page icon
  //
  ////////////////////////////////

  static setupBlocksSpecs() {
    return {
      onflag: [
        'onflag',
        BlockSpecs.getImageFrom('/static/scratchjr/assets/blockicons/greenFlag', 'svg'),
        BlockSpecs.yellowStart,
        null,
        null,
        BlockSpecs.yellowStartH,
        null,
        null,
        BlockSpecs.startS
      ],
      onmessage: [
        'onmessage',
        getshapes,
        BlockSpecs.yellowStart,
        'm',
        'Orange',
        BlockSpecs.yellowStartH,
        null,
        null,
        BlockSpecs.startS
      ],
      onclick: [
        'onclick',
        BlockSpecs.getImageFrom('/static/scratchjr/assets/blockicons/OnTouch', 'svg'),
        BlockSpecs.yellowStart,
        null,
        null,
        BlockSpecs.yellowStartH,
        null,
        null,
        BlockSpecs.startS
      ],
      ontouch: [
        'ontouch',
        BlockSpecs.getImageFrom('/static/scratchjr/assets/blockicons/Bump', 'svg'),
        BlockSpecs.yellowStart,
        null,
        null,
        BlockSpecs.yellowStartH,
        null,
        null,
        BlockSpecs.startS
      ],
      message: [
        'message',
        sendshapes,
        BlockSpecs.yellowCmd,
        'm',
        'Orange',
        BlockSpecs.yellowCmdH,
        null,
        null,
        BlockSpecs.cmdS
      ],

      repeat: [
        'repeat',
        BlockSpecs.getImageFrom('/static/scratchjr/assets/blockicons/Repeat', 'svg'),
        BlockSpecs.cShape,
        'n',
        4,
        BlockSpecs.cShapeH,
        0,
        24,
        BlockSpecs.repeatS
      ],

      forward: [
        'forward',
        BlockSpecs.getImageFrom('/static/scratchjr/assets/blockicons/Foward', 'svg'),
        BlockSpecs.blueCmd,
        'n',
        1,
        BlockSpecs.blueCmdH,
        -20,
        20,
        BlockSpecs.cmdS
      ],
      back: [
        'back',
        BlockSpecs.getImageFrom('/static/scratchjr/assets/blockicons/Back', 'svg'),
        BlockSpecs.blueCmd,
        'n',
        1,
        BlockSpecs.blueCmdH,
        -20,
        20,
        BlockSpecs.cmdS
      ],
      up: [
        'up',
        BlockSpecs.getImageFrom('/static/scratchjr/assets/blockicons/Up', 'svg'),
        BlockSpecs.blueCmd,
        'n',
        1,
        BlockSpecs.blueCmdH,
        -15,
        15,
        BlockSpecs.cmdS
      ],
      down: [
        'down',
        BlockSpecs.getImageFrom('/static/scratchjr/assets/blockicons/Down', 'svg'),
        BlockSpecs.blueCmd,
        'n',
        1,
        BlockSpecs.blueCmdH,
        -15,
        15,
        BlockSpecs.cmdS
      ],
      right: [
        'right',
        BlockSpecs.getImageFrom('/static/scratchjr/assets/blockicons/Right', 'svg'),
        BlockSpecs.blueCmd,
        'n',
        1,
        BlockSpecs.blueCmdH,
        -12,
        12,
        BlockSpecs.cmdS
      ],
      left: [
        'left',
        BlockSpecs.getImageFrom('/static/scratchjr/assets/blockicons/Left', 'svg'),
        BlockSpecs.blueCmd,
        'n',
        1,
        BlockSpecs.blueCmdH,
        -12,
        12,
        BlockSpecs.cmdS
      ],
      home: [
        'home',
        BlockSpecs.getImageFrom('/static/scratchjr/assets/blockicons/Home', 'svg'),
        BlockSpecs.blueCmd,
        null,
        null,
        BlockSpecs.blueCmdH,
        null,
        null,
        BlockSpecs.cmdS
      ],
      hop: [
        'hop',
        BlockSpecs.getImageFrom('/static/scratchjr/assets/blockicons/Hop', 'svg'),
        BlockSpecs.blueCmd,
        'n',
        2,
        BlockSpecs.blueCmdH,
        -15,
        15,
        BlockSpecs.cmdS
      ],

      wait: [
        'wait',
        BlockSpecs.getImageFrom('/static/scratchjr/assets/blockicons/Wait', 'svg'),
        BlockSpecs.orangeCmd,
        'n',
        10,
        BlockSpecs.orangeCmdH,
        0,
        50,
        BlockSpecs.cmdS
      ],
      setspeed: ['setspeed', speeds, BlockSpecs.orangeCmd, 'd', 1, BlockSpecs.orangeCmdH, null, null, BlockSpecs.cmdS],
      stopmine: [
        'stopmine',
        BlockSpecs.getImageFrom('/static/scratchjr/assets/blockicons/Stop', 'svg'),
        BlockSpecs.orangeCmd,
        null,
        null,
        BlockSpecs.orangeCmdH,
        null,
        null,
        BlockSpecs.cmdS
      ],

      say: [
        'say',
        BlockSpecs.getImageFrom('/static/scratchjr/assets/blockicons/Say', 'svg'),
        BlockSpecs.pinkCmd,
        't',
        Localization.localize('SAY_BLOCK_DEFAULT_ARGUMENT'),
        BlockSpecs.pinkCmdH,
        null,
        null,
        BlockSpecs.cmdS
      ],
      show: [
        'show',
        BlockSpecs.getImageFrom('/static/scratchjr/assets/blockicons/Appear', 'svg'),
        BlockSpecs.pinkCmd,
        null,
        null,
        BlockSpecs.pinkCmdH,
        null,
        null,
        BlockSpecs.cmdS
      ],
      hide: [
        'hide',
        BlockSpecs.getImageFrom('/static/scratchjr/assets/blockicons/Disappear', 'svg'),
        BlockSpecs.pinkCmd,
        null,
        null,
        BlockSpecs.pinkCmdH,
        null,
        null,
        BlockSpecs.cmdS
      ],
      grow: [
        'grow',
        BlockSpecs.getImageFrom('/static/scratchjr/assets/blockicons/Grow', 'svg'),
        BlockSpecs.pinkCmd,
        'n',
        2,
        BlockSpecs.pinkCmdH,
        -10,
        10,
        BlockSpecs.cmdS
      ],
      shrink: [
        'shrink',
        BlockSpecs.getImageFrom('/static/scratchjr/assets/blockicons/Shrink', 'svg'),
        BlockSpecs.pinkCmd,
        'n',
        2,
        BlockSpecs.pinkCmdH,
        -10,
        10,
        BlockSpecs.cmdS
      ],
      same: [
        'same',
        BlockSpecs.getImageFrom('/static/scratchjr/assets/blockicons/Reset', 'svg'),
        BlockSpecs.pinkCmd,
        null,
        null,
        BlockSpecs.pinkCmdH,
        null,
        null,
        BlockSpecs.cmdS
      ],

      playsnd: [
        'playsnd',
        BlockSpecs.getImageFrom('/static/scratchjr/assets/blockicons/Speaker', 'svg'),
        BlockSpecs.limeCmd,
        's',
        'pop.mp3',
        BlockSpecs.limeCmdH,
        null,
        null,
        BlockSpecs.cmdS
      ],
      playusersnd: [
        'playusersnd',
        BlockSpecs.getImageFrom('/static/scratchjr/assets/blockicons/Microphone', 'svg'),
        BlockSpecs.limeCmd,
        'r',
        '1',
        BlockSpecs.limeCmdH,
        null,
        null,
        BlockSpecs.cmdS
      ],
      endstack: ['endstack', null, BlockSpecs.redEnd, null, null, BlockSpecs.redEndH, null, null, BlockSpecs.endS],
      forever: [
        'forever',
        BlockSpecs.getImageFrom('/static/scratchjr/assets/blockicons/Forever', 'svg'),
        BlockSpecs.redEnd,
        null,
        null,
        BlockSpecs.redEndH,
        null,
        null,
        BlockSpecs.endS
      ],
      gotopage: [
        'gotopage',
        null,
        BlockSpecs.redEndLong,
        'p',
        '2',
        BlockSpecs.redEndLongH,
        null,
        null,
        BlockSpecs.endLongS
      ],
      caretstart: [
        'caretstart',
        null,
        BlockSpecs.getImageFrom('/static/scratchjr/assets/blocks/caretstart', 'svg'),
        null,
        null,
        null,
        null,
        null
      ],
      caretend: [
        'caretend',
        null,
        BlockSpecs.getImageFrom('/static/scratchjr/assets/blocks/caretend', 'svg'),
        null,
        null,
        null,
        null,
        null
      ],
      caretrepeat: [
        'caretrepeat',
        null,
        BlockSpecs.getImageFrom('/static/scratchjr/assets/blocks/caretrepeat'),
        null,
        null,
        null,
        null,
        null
      ],
      caretcmd: [
        'caretcmd',
        null,
        BlockSpecs.getImageFrom('/static/scratchjr/assets/blocks/caretcmd', 'svg'),
        null,
        null,
        null,
        null,
        null
      ]
    };
  }

  static blockDesc(b, spr) {
    var str = b.getArgValue() ? b.getArgValue().toString() : b.blocktype == 'playsnd' ? 'SOUND' : '';

    return {
      onflag: Localization.localize('BLOCK_DESC_GREEN_FLAG'),
      onclick: Localization.localize('BLOCK_DESC_ON_TAP', {
        CHARACTER_NAME: spr.name
      }),
      ontouch: Localization.localize('BLOCK_DESC_ON_BUMP', {
        CHARACTER_NAME: spr.name ? spr.name : ''
      }),
      onmessage: Localization.localize('BLOCK_DESC_ON_MESSAGE', {
        COLOR: Localization.localize('BLOCK_DESC_MESSAGE_COLOR_ORANGE')
      }),
      repeat: Localization.localize('BLOCK_DESC_REPEAT'),
      forward: Localization.localize('BLOCK_DESC_MOVE_RIGHT'),
      back: Localization.localize('BLOCK_DESC_MOVE_LEFT'),
      up: Localization.localize('BLOCK_DESC_MOVE_UP'),
      down: Localization.localize('BLOCK_DESC_MOVE_DOWN'),
      home: Localization.localize('BLOCK_DESC_GO_HOME'),
      left: Localization.localize('BLOCK_DESC_TURN_LEFT'),
      right: Localization.localize('BLOCK_DESC_TURN_RIGHT'),
      hop: Localization.localize('BLOCK_DESC_HOP'),
      wait: Localization.localize('BLOCK_DESC_WAIT'),
      setspeed: Localization.localize('BLOCK_DESC_SET_SPEED'),
      stopmine: Localization.localize('BLOCK_DESC_STOP', {
        CHARACTER_NAME: spr.name ? spr.name : spr.str
      }),
      say: Localization.localize('BLOCK_DESC_SAY'),
      show: Localization.localize('BLOCK_DESC_SHOW'),
      hide: Localization.localize('BLOCK_DESC_HIDE'),
      grow: Localization.localize('BLOCK_DESC_GROW'),
      shrink: Localization.localize('BLOCK_DESC_SHRINK'),
      same: Localization.localize('BLOCK_DESC_RESET_SIZE'),
      playsnd: Localization.localize('BLOCK_DESC_PLAY_SOUND', {
        SOUND_NAME: Localization.localize('BLOCK_DESC_PLAY_SOUND_POP')
      }),
      playusersnd: Localization.localize('BLOCK_DESC_PLAY_RECORDED_SOUND'),
      endstack: Localization.localize('BLOCK_DESC_END'),
      stopall: Localization.localize('BLOCK_DESC_STOP', {
        CHARACTER_NAME: spr.name ? spr.name : ''
      }),
      forever: Localization.localize('BLOCK_DESC_REPEAT_FOREVER'),
      gotopage: Localization.localize('BLOCK_DESC_GO_TO_PAGE', {
        PAGE: str
      }),
      message: Localization.localize('BLOCK_DESC_SEND_MESSAGE', {
        COLOR: Localization.localize('BLOCK_DESC_MESSAGE_COLOR_ORANGE')
      })
    };
  }
}
