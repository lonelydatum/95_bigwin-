(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _proline = require("./proline");

var _helpersHelpersJs = require("./helpers/helpers.js");

var _ypy_fxJs = require('./ypy_fx.js');

var banner = document.getElementById('banner');
var bannerSize = { w: banner.offsetWidth, h: banner.offsetHeight };

gsap.defaults({
	ease: "power3.out"
});

var READ_COMPOSITE = { t1: 1.6, t2: 3 };
var READ_LIVEDEALERS = { t1: 1.6, t2: 3 };
var READ_GAMESHOW = { t1: 1.6, t2: 3.3 };

var READ_ALL = { composite: READ_COMPOSITE, gameshow: READ_GAMESHOW, livedealers: READ_LIVEDEALERS };

var read = READ_ALL[universalBanner.name];
var w = bannerSize.w;
var h = bannerSize.h;

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

function init(_ref) {
	var ypy = _ref.ypy;
	var device = _ref.device;
	var logoAnimateStart = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];

	var tl = new TimelineMax({ onComplete: function onComplete() {
			if (document.getElementById("legalBtn")) {
				TweenLite.set("#legalBtn", { display: "block" });
			}
		} });

	TweenLite.to(".hero_on", { duration: 2, opacity: 1, yoyo: true, repeat: 0, repeatDelay: 0, ease: "back.out" });
	TweenLite.to(".phone", { duration: .8, opacity: .6, yoyo: true, repeat: 11, repeatDelay: 0, ease: "back.out" });
	tl.set(".frame1", { opacity: 1 });

	tl.add(ypy);
	tl.add("t1", "+=.2");
	tl.from([".t1"], { duration: .3, opacity: 0 }, "t1");
	tl.from([".device"], { duration: .5, opacity: 0 }, "t1");
	tl.to(".t1", { duration: .3, opacity: 0 }, "+=" + read.t1);

	tl.add("t2");
	if (device) {
		tl.add(device);
	}

	tl.from(".t2", { duration: .3, opacity: 0 }, "t2");
	tl.to(".t2", { duration: .3, opacity: 0 }, "+=" + read.t2);
	tl.to([".frame1"], { duration: .3, opacity: 0 });
	tl.set(".frame2", { opacity: 1 }, "+=.4");
	tl.from(".end_device", { duration: .3, opacity: 0 });
	tl.from(".end_url", { duration: .3, opacity: 0 }, "+=.3");
	tl.from(".end_ypy", { duration: .3, opacity: 0 }, "+=.3");
	tl.from(".end_cta", { duration: .3, opacity: 0, y: "+=50", opacity: 0 }, "+=.3");

	tl.add(logoGO());
	return tl;
}

exports.init = init;
exports.olg = _proline.olg;
exports.bannerSize = bannerSize;
exports.logoGO = logoGO;
exports.read = read;

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

var tl = new TimelineMax();
// tl.from([".ypy_1", ".ypy_2", ".ypy_3"], {duration:.3, opacity:0, stagger:.3})

(0, _commonJsCommonJs.init)({ ypy: tl });

},{"../../_common/js/common.js":1}]},{},[5])


//# sourceMappingURL=main.js.map
