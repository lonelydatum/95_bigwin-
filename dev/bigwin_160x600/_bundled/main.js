(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _proline = require("./proline");

var _helpersHelpersJs = require("./helpers/helpers.js");

var _ypy_fxJs = require('./ypy_fx.js');

var banner = document.getElementById('banner');
var bannerSize = { w: banner.offsetWidth, h: banner.offsetHeight };

gsap.defaults({
  ease: "power3.out"
});

gsap.registerPlugin(MotionPathPlugin);

var READ = { t0: 2, t1: 2 };

var w = bannerSize.w;
var h = bannerSize.h;

function init(_ref) {
  var pos = _ref.pos;
  var device = _ref.device;
  var total = _ref.total;

  var posX = pos[0] * w;
  var posY = pos[1] * h;
  var tl = new TimelineMax({ onComplete: function onComplete() {
      if (document.getElementById("legalBtn")) {
        TweenLite.set("#legalBtn", { display: "block" });
      }
    } });
  tl.set(".frame1", { opacity: 1 });
  TweenLite.set("#shapes", { x: posX, y: posY });
  TweenLite.set(["#circle", "#tri"], { scale: 0 });

  tl.add("bars");
  tl.from(".top", { y: "-=100", opacity: 0, duration: .5, stagger: .05 }, "bars");
  tl.from(".bottom", { y: "+=100", opacity: 0, duration: .5, stagger: .05 }, "bars");

  tl.from(".ypy", { y: "+=150", opacity: 0, duration: .4, stagger: .2 }, "bars+=.2");
  // return

  scaler(".screen_1_screen_only", pos[0], pos[1]);
  scaler(".screen_2", pos[0], pos[1]);

  tl.add("screen_1");
  tl.from(".screen_1_screen_only", { duration: .4, scale: 0, ease: "back.out" }, "screen_1");
  tl.from(".t0", { opacity: 0, duration: .3 }, "screen_1");

  tl.add("screen_change", "+=" + READ.t0);

  tl.call(function () {
    confetti({ total: total, posX: posX, posY: posY });
  });
  // return
  // tl.to(".shapes", {opacity:0, duration:1}, "screen_change+=.5")
  tl.to(".t0", { opacity: 0, duration: .3 }, "screen_change");
  tl.from(".screen_2", { duration: .4, scale: 0, ease: "back.out" }, "screen_change");
  tl.to(".screen_1", { duration: .3, scale: 0, ease: "back.out" }, "screen_change");

  tl.from(".t1", { opacity: 0, duration: .3 }, "screen_change");

  tl.to(".shapes", { opacity: 0, duration: 2 }, "+=1");

  tl.to(".t1", { opacity: 0, duration: .3 }, "+=" + READ.t1);

  tl.add("end");
  tl.to(".ypy", { opacity: 0, duration: .3 }, "end");
  if (device) {
    tl.to(".screen", _extends({}, device, { duration: .3 }), "end");
  }

  tl.from(".end_text", { opacity: 0, duration: .3 });
  tl.from([".end_legal", ".end_cta"], { opacity: 0, duration: .3 });

  tl.add(logoGO());

  return tl;
}

function confetti(_ref2) {
  var total = _ref2.total;
  var posX = _ref2.posX;
  var posY = _ref2.posY;

  var MAGIC_NUMBER = 750;
  var area = w * h;
  console.log(area / MAGIC_NUMBER);
  var tl = new TimelineMax();
  for (var i = 0; i < area / MAGIC_NUMBER; i++) {

    tl.add(copyShape(posX, posY), 0);
  }
}

function scaler(el, x, y) {
  TweenLite.set(el, { transformOrigin: x * 100 + "% " + y * 100 + "%", x: "-" + x * w, y: "-" + y * h });
}

function minMax(min, max) {
  var diff = max - min;
  var num = Math.random() * diff + min;
  return num;
}

function copyShape(posX, posY) {
  var tl = new TimelineMax();
  var options = ["circle", "tri"];
  var colors = ["66cef6", "fed925", "8dc63f", "003c71", "fed925", "fed925"];
  var numShape = Math.floor(Math.random() * options.length);
  var numColors = Math.floor(Math.random() * colors.length);

  var cloned = document.getElementById(options[numShape]).cloneNode(true);
  document.getElementById("shapes").appendChild(cloned);
  var PADDING = 0;
  var w_ = w + PADDING;
  var h_ = h + PADDING;

  var x = Math.random() * w_ - posX;

  var y = Math.random() * h_ - posY;

  var p2 = { x: x * .6, y: minMax(-posY, -posY - 10) };
  var p3 = { x: minMax(x, x - 50), y: h - posY - 12 };

  TweenLite.set(cloned, { fill: "#" + colors[numColors], opacity: 1 });
  var MAGIC_NUMBER = 100;
  var duration = Math.min(h / MAGIC_NUMBER, 3.6);
  console.log(duration);
  var obj = {
    duration: minMax(1, duration),
    scale: minMax(.1, .7),
    ease: "back.out",
    rotation: minMax(90, 300),
    motionPath: {
      path: [p2, p3],
      curviness: .5, // makes a nice smooth arc
      autoRotate: false
    }
  };

  // console.log({...obj});

  tl.to(cloned, obj);
  return tl;
}

function logoGO() {
  var tl = new TimelineMax();
  tl.set(["#heart", "#leaf", "#number"], { opacity: 0 });
  tl.set(["#fire", "#bg", "#logo_olg"], { scale: 0 });

  tl.to(["#bg", "#logo_olg"], { duration: .7, stagger: .1, scale: 1, ease: "back.out" });

  tl.to("#number", { duration: .3, opacity: 1 }, "-=.25");
  var PAUSE = .25;

  tl.set("#zero", { opacity: 1 });

  tl.add("heart", "+=" + PAUSE);
  tl.to("#zero", { duration: .1, opacity: 0 }, "heart");
  tl.to("#heart", { duration: .1, opacity: 1 }, "heart");

  tl.add("fire", "+=" + PAUSE);
  tl.to("#heart", { duration: .1, opacity: 0 }, "fire");
  tl.to("#fire", { duration: .5, scale: 1, ease: "back.out" }, "fire");

  tl.add("leaf", "+=" + PAUSE);
  tl.to("#fire", { duration: .1, scale: 0 }, "leaf");
  tl.to("#leaf", { duration: .1, opacity: 1 }, "leaf");

  tl.add("zero", "+=" + PAUSE);
  tl.to("#leaf", { duration: .1, opacity: 0 }, "zero");
  tl.to("#zero", { duration: .1, opacity: 1 }, "zero");
  return tl;
}
exports.bannerSize = bannerSize;
exports.logoGO = logoGO;
exports.copyShape = copyShape;
exports.minMax = minMax;
exports.scaler = scaler;
exports.init = init;

},{"./helpers/helpers.js":2,"./proline":3,"./ypy_fx.js":4}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
function origin(el, x, y) {
	TweenLite.set(el, { transformOrigin: x + "px " + y + "px", x: -x / 2 + "px", y: -y / 2 + "px", scale: .5 });
}

exports.origin = origin;

},{}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

CustomEase.create("custom", "M0,0 C0.14,0 0.234,0.438 0.264,0.561 0.305,0.728 0.4,1.172 0.55,1.172 0.652,1.172 0.722,1.102 0.77,1.024 0.834,0.93 0.89,0.946 0.916,0.946 0.952,0.946 1,1 1,1 ");

function olg() {
    TweenLite.set("#olg", { opacity: 1 });

    var tl = new TimelineMax({ onStart: function onStart() {
            TweenLite.set(".olg-static", { opacity: 0 });
        } });

    tl.to("#bluewedge1", { duration: .5, ease: 'power1.inOut', scaleY: 1, scale: 1, x: 0, y: 0 }, 0);
    tl.to("#redwedge1", { duration: .8, ease: 'power1.inOut', scaleY: 1, scale: 1, x: 0, y: 0 }, 0).from('#group-o', { duration: 1, y: 200, ease: "custom" }, 0).from('#group-l', { duration: 1, y: 200, ease: "custom" }, .1).from('#group-g', { duration: 1, y: 200, ease: "custom" }, .2).from('#group-o', { duration: .8, scale: .4, ease: "power1.out" }, .3).from('#group-l', { duration: .8, scale: .4, ease: "power1.out" }, .4).from('#group-g', { duration: .8, scale: .4, ease: "power1.out" }, .5).from('#letter-o', { duration: .25, scale: 0, ease: 'back.out(2)', svgOrigin: '28pt 75pt' }, .9).from('#letter-l', { duration: .25, scale: 0, ease: 'back.out(2)', svgOrigin: '55pt 75pt' }, 1).from('#letter-g', { duration: .25, scale: 0, ease: 'back.out(2)', svgOrigin: '80pt 75pt' }, 1.1);

    // tl.timeScale(2)

    return tl;
}

exports.olg = olg;

},{}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
function initYPY() {
	var tl = new TimelineMax();
	// tl.set(".ypy-all", {opacity:0})
	for (var i = 1; i < 11; i++) {
		tl.set(".ypy-all .ypy_all_" + i + " img", { y: -220 });
	}
}
function ypyScroll() {
	var tl = new TimelineMax();

	// tl.set(".ypy-all", {opacity:0})
	tl.add("spin");
	tl.set(".hide-until", { visibility: "visible" }, "spin");
	for (var i = 1; i < 11; i++) {
		var y = i * 20;
		var duration = i / 11 * 1.6;

		tl.to(".ypy-all .ypy_all_" + i + " img", { ease: "back.inOut", y: (i - 1) * -20 - 2, duration: duration }, "spin");
	}
	return tl;
}

initYPY();

exports.initYPY = initYPY;
exports.ypyScroll = ypyScroll;

},{}],5:[function(require,module,exports){
'use strict';

var _commonJsCommonJs = require('../../_common/js/common.js');

(0, _commonJsCommonJs.init)({ pos: [.5, .36], total: 37 });

},{"../../_common/js/common.js":1}]},{},[5])


//# sourceMappingURL=main.js.map
