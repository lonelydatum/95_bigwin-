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
 
function init( {pos} ){	
	const posX = pos[0] * w
	const posY = pos[1] * h
	const tl = new TimelineMax({onComplete:()=>{
		if(document.getElementById("legalBtn")){			
			TweenLite.set("#legalBtn", {display:"block"})
		}
	}})


	
	
	tl.set(".frame1", {opacity:1})	 
  TweenLite.from(".top", {y:"-=100", opacity:0, duration:.4, stagger:.05})
  TweenLite.from(".bottom", {y:"+=100", opacity:0, duration:.4, stagger:.05})


  tl.from(".ypy", {y:"+=150", opacity:0, duration:.4, stagger:.2})

  TweenLite.set("#shapes", {x:posX, y:posY})
  TweenLite.set(["#circle", "#tri"], {scale:0})

  const tlShapes = new TimelineMax()
  for(let i=0;i<40;i++){
  	tlShapes.add(copyShape(posX, posY), 0)
  }

  scaler(".screen_1_screen_only", pos[0], pos[1])
  scaler(".screen_2", pos[0], pos[1])

  tl.add("screen_1")
	tl.from(".screen_1_screen_only", {duration:.5, scale:0, ease:"back.out"}, "screen_1")
  tl.from(".t0", {opacity:0, duration:.3}, "screen_1")
  


  tl.add("screen_change", "+=2")
  tl.to(".t0", {opacity:0, duration:.3}, "screen_change")
  tl.from(".screen_2", {duration:.5, scale:0, ease:"back.out"}, "screen_change")
  tl.to(".screen_1", {duration:.5, scale:0, ease:"back.out"}, "screen_change")

	tl.from(".t1", {opacity:0, duration:.3}, "screen_change")
  


  tl.add(tlShapes)
  tlShapes.add("shapesOut")
  tlShapes.to(".shapes", {opacity:0, duration:1}, "shapesOut")
  // tlShapes.from(".shapes_all", {opacity:0, duration:1}, "shapesOut")




  tl.to(".t1", {opacity:0, duration:.3}, "+=2")

  tlShapes.add("end", .5)
  tl.to(".ypy", {opacity:0, duration:.3}, "end")
  tl.to(".screen", {x:-91, duration:.3}, "end")
  tl.from(".end_text", {opacity:0, duration:.3})
  tl.from([".end_legal", ".end_cta"], {opacity:0, duration:.3})
  
  tl.add(logoGO())
  
	return tl
}

function scaler(el, x, y){
	TweenLite.set(el, { transformOrigin:`${x*100}% ${y*100}%`, x:`-${x*w}`, y:`-${y*h}` })
	
	
}

function minMax(min, max){
	const diff = max-min
	const num =  Math.random()*diff + min
	
	return num
}

function copyShape(posX, posY){
	const tl = new TimelineMax()
	const options = ["circle", "tri"]
	const colors = ["66cef6", "fed925", "8dc63f", "003c71", "fed925", "fed925"]
	const numShape = Math.floor(Math.random()*options.length)
	const numColors = Math.floor(Math.random()*colors.length)
	
	
	const cloned = document.getElementById(options[numShape]).cloneNode(true)
  document.getElementById("shapes").appendChild(cloned)
  const PADDING = 90
  const w_ = w+PADDING
  const h_ = h+PADDING


  const x = Math.random()*w_ - posX-PADDING
  const y = Math.random()*h_ - posY-PADDING
  TweenLite.set(cloned, {fill:`#${colors[numColors]}`, opacity:1})
  const obj = {
  	x:x, 
  	y:y,   	
  	duration:minMax(.2, 1.3), 
  	rotation: minMax(0, 300),
  	scale:minMax(.2, .7)}
  tl.to(cloned, obj)
  return tl
  // tl.to(cloned, {opacity:0, duration:1}, 2)

}


 

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
export { init, olg, bannerSize, read }