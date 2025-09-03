import {olg} from "./proline"
import {origin} from "./helpers/helpers.js"
import {initYPY, ypyScroll} from './ypy_fx.js'
const banner = document.getElementById('banner')
const bannerSize = {w:banner.offsetWidth, h:banner.offsetHeight}

gsap.defaults({
  ease: "power3.out"
});

const READ_COMPOSITE = { t1: 1.6, t2: 3 }
const READ_LIVEDEALERS = { t1: 1.6, t2: 3 }
const READ_GAMESHOW = { t1: 1.6, t2: 3.3 }


const READ_ALL = { composite: READ_COMPOSITE, gameshow: READ_GAMESHOW, livedealers:READ_LIVEDEALERS }

const read = READ_ALL[universalBanner.name]
const {w, h} = bannerSize

function logoGO(){
	const tl = new TimelineMax()
	tl.set(["#heart", "#leaf", "#number"], {opacity:0})
	tl.set(["#fire", `#bg`, `#logo_olg`], {scale:0})

	tl.to([`#bg`, `#logo_olg`], {duration:.7, stagger:.1, scale:1, ease:"back.out"})
	
	tl.to(`#number`, {duration:.3,  opacity:1}, "-=.25")
	const PAUSE = .25

	tl.set(`#zero`, { opacity:1})

	tl.add("heart", `+=${PAUSE}`)
	tl.to(`#zero`,  {duration:.1, opacity:0}, "heart")
	tl.to(`#heart`,  {duration:.1, opacity:1}, "heart")

	tl.add("fire", `+=${PAUSE}`)
	tl.to(`#heart`,   {duration:.1, opacity:0}, "fire")
	tl.to(`#fire`,  {duration:.5, scale:1, ease:"back.out"}, "fire")

	tl.add("leaf", `+=${PAUSE}`)
	tl.to(`#fire`, {duration:.1, scale:0}, "leaf")
	tl.to(`#leaf`, {duration:.1, opacity:1}, "leaf")

	tl.add("zero", `+=${PAUSE}`)
	tl.to(`#leaf`, {duration:.1, opacity:0}, "zero")
	tl.to(`#zero`, {duration:.1, opacity:1}, "zero")
	return tl
}

function init({ypy, device}, logoAnimateStart=false){	
	const tl = new TimelineMax({onComplete:()=>{
		if(document.getElementById("legalBtn")){			
			TweenLite.set("#legalBtn", {display:"block"})
		}
	}})
	
	TweenLite.to(".hero_on", {duration:2, opacity:1, yoyo:true, repeat:0, repeatDelay:0, ease:"back.out"})
	TweenLite.to(".phone", {duration:.8, opacity:.6, yoyo:true, repeat:11, repeatDelay:0, ease:"back.out"})
	tl.set(".frame1", {opacity:1})	 
 
	tl.add(ypy)
	tl.add("t1", "+=.2")
	tl.from([".t1"], {duration:.3, opacity:0}, "t1")
	tl.from([".device"], {duration:.5, opacity:0}, "t1")
	tl.to(".t1", {duration:.3, opacity:0}, `+=${read.t1}`)
 
	tl.add("t2")
	if(device){
		tl.add(device)	
	}
		
	tl.from(".t2", {duration:.3, opacity:0}, "t2")
	tl.to(".t2", {duration:.3, opacity:0}, `+=${read.t2}`)
	tl.to([  ".frame1"], {duration:.3, opacity:0} )
	tl.set(".frame2", {opacity:1}, "+=.4")
	tl.from(".end_device", {duration:.3, opacity:0})
	tl.from(".end_url", {duration:.3, opacity:0}, "+=.3")
	tl.from(".end_ypy", {duration:.3, opacity:0}, "+=.3")
	tl.from(".end_cta", {duration:.3, opacity:0, y:"+=50", opacity:0}, "+=.3")

	tl.add(logoGO())
	return tl
}


 

export { init, olg, bannerSize, logoGO, read }