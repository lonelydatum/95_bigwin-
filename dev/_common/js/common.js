import {olg} from "./proline"
import {origin} from "./helpers/helpers.js"
import {initYPY, ypyScroll} from './ypy_fx.js'
const banner = document.getElementById('banner')
const bannerSize = {w:banner.offsetWidth, h:banner.offsetHeight}

gsap.defaults({
  ease: "power3.out"
});
gsap.registerPlugin(MotionPathPlugin);


const READ = {t0:2.5, t1:2.8}
const {w, h} = bannerSize
 
function init( {pos, device} ){		
	const posX = pos[0] * w
	const posY = pos[1] * h
	const tl = new TimelineMax({onComplete:()=>{
		if(document.getElementById("legalBtn")){			
			TweenLite.set("#legalBtn", {display:"block"})
		}
	}})
	tl.set(".frame1", {opacity:1})	 
	scaler(".screen_1_screen_only", pos[0], pos[1])
  scaler(".screen_2", pos[0], pos[1])
	
	tl.add("bars")
  tl.from(".top", {y:"-=100", opacity:0, duration:.5, stagger:.05}, "bars")
  tl.from(".bottom", {y:"+=100", opacity:0, duration:.5, stagger:.05}, "bars")
  tl.from(".ypy", {y:"+=150", opacity:0, duration:.3, stagger:.1}, "bars+=.2")

  

  tl.add("screen_1")
	tl.from(".screen_1_screen_only", {duration:.4, scale:0, ease:"back.out"}, "screen_1")
  tl.from(".t0", {opacity:0, duration:.3}, "screen_1")
  tl.add("screen_change", `+=${READ.t0}`)
  

  tl.call(()=>{
  	confetti({  posX, posY})
  }, [])


  
  tl.to(".t0", {opacity:0, duration:.3}, "screen_change")
  tl.from(".screen_2", {duration:.4, scale:0, ease:"back.out"}, "screen_change")
  tl.to(".screen_1", {duration:.3, scale:0, ease:"back.out"}, "screen_change")
	tl.from(".t1", {opacity:0, duration:.3}, "+=.5")
  tl.to(".t1", {opacity:0, duration:.3}, `+=${READ.t1}`)
  tl.add("end")
  tl.to(".ypy", {opacity:0, duration:.3}, "end")
  if(device){
  	tl.to(".screen", {...device, duration:.3}, "end")	
  }
  

  tl.from(".end_text", {opacity:0, duration:.3})
  tl.from([".end_legal", ".end_cta"], {opacity:0, duration:.3})  
  tl.add(logoGO())  
	return tl
}

function confetti({posX, posY}){

	TweenLite.set("#shapes", {x:posX, y:posY})
  TweenLite.set(["#circle", "#tri"], {scale:0})
	const MAGIC_NUMBER = 750
	const area = w*h
	const total = Math.min(area/MAGIC_NUMBER, 150)
	
	
	const tl = new TimelineMax()
	for(let i=0;i<total;i++){
  	tl.add(copyShape(posX, posY), 0)
  }
  
}

function copyShape(posX, posY){
	const tl = new TimelineMax()
	const options = ["circle", "tri"]
	const colors = ["66cef6", "fed925", "8dc63f", "003c71", "fed925", "fed925"]
	const numShape = Math.floor(Math.random()*options.length)
	const numColors = Math.floor(Math.random()*colors.length)
	
	
	const cloned = document.getElementById(options[numShape]).cloneNode(true)
  document.getElementById("shapes").appendChild(cloned)
  const PADDING = 0
  const w_ = w+PADDING
  const h_ = h+PADDING


  let x = (Math.random()*w)
  let y = Math.random()*h
  x = x-15-posX
  y = y-posY
  if(x<-400){
  	x = x/3
  }

  if(w===320){
  	y = -50
  }
  
  console.log(y);
  
  const p2 = {x:x, y:minMax(-posX, 200)}  
  
  
  TweenLite.set(cloned, {fill:`#${colors[numColors]}`, opacity:minMax(.8, 1)})
  const MAGIC_NUMBER = 130; // higher = faster
  const duration = Math.min(h/MAGIC_NUMBER, 2)
  
  const obj = {  	
  	duration:minMax(.5, .7),  	
  	scale: minMax(.15, .5),
  	x:x,
  	y:y,
  	ease:"power1.in",
  	rotation:minMax(90, 300),
  	 
	}

  tl.to(cloned, obj)
  tl.to(cloned, {
  	duration:minMax(.3, 1), 
  	ease:"pwer2.out",
  	y:"+=150",
  	rotation:minMax(90, 300), 
  	x:`${Math.random()>.5?"-":"+"}=20`, 
  	opacity:0,
  	scale:"+=.3"

  },"-=.01")
  return tl
  

}



function copyShape____(posX, posY){
	const tl = new TimelineMax()
	const options = ["circle", "tri"]
	const colors = ["66cef6", "fed925", "8dc63f", "003c71", "fed925", "fed925"]
	const numShape = Math.floor(Math.random()*options.length)
	const numColors = Math.floor(Math.random()*colors.length)
	
	
	const cloned = document.getElementById(options[numShape]).cloneNode(true)
  document.getElementById("shapes").appendChild(cloned)
  const PADDING = 0
  const w_ = w+PADDING
  const h_ = h+PADDING


  let x = Math.random()*w
  let y = Math.random()*h
  x = x-15-posX
  y = y-15-posY
  if(x<-400){
  	x = x/2
  }
 
  
  
  
  const p2 = {x:x, y:minMax(-100, -300)}  
  const p3 = {x:Math.random()>.5?x-20:x+20, y:minMax(h-posY, h-posY+50)}  
  // console.log([p2, p3]);
  
  
  TweenLite.set(cloned, {fill:`#${colors[numColors]}`, opacity:minMax(.8, 1)})
  const MAGIC_NUMBER = 130; // higher = faster
  const duration =minMax(1, 1.2)
  
  const obj = {  	
  	duration: 5,  	
  	scale: minMax(.3, .6),
  	
  	ease:"power1.in",
  	rotation:minMax(90, 300),
  	 motionPath: {
      path: [
        p2, p3
      ],
      curviness: .05, // straight line
      autoRotate: false
    },
    


	}

  tl.to(cloned, obj)
  tl.to(cloned, {opacity:0, duration:.3} )
  // tl.to(cloned, {
  // 	duration:.5, 
  // 	ease:"power3.out",
  // 	y:p3.y,
  // 	rotation:minMax(90, 300), 
  // 	x:p3.x, 
  // 	opacity:0,

  // },`-=${duration*0}`)
  return tl
  

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


function scaler(el, x, y){
	TweenLite.set(el, { transformOrigin:`${x*100}% ${y*100}%`, x:`-${x*w}`, y:`-${y*h}` })
}

function minMax(min, max){
	const diff = max-min
	const num =  Math.random()*diff + min	
	return num
}


export { bannerSize, logoGO, copyShape, minMax, scaler, init, confetti, READ }