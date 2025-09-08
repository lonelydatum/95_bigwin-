import {bannerSize, logoGO, copyShape, minMax, scaler} from '../../_common/js/common.js'





const READ = {t0:2, t1:2}


 
const {w, h} = bannerSize

function init( {pos} ){	
	console.log(pos);
	const posX = pos[0] * w
	const posY = pos[1] * h
	const tl = new TimelineMax({onComplete:()=>{
		if(document.getElementById("legalBtn")){			
			TweenLite.set("#legalBtn", {display:"block"})
		}
	}})

	TweenLite.set("#shapes", {x:posX, y:posY})
  TweenLite.set(["#circle", "#tri"], {scale:0})
	
	
	tl.set(".frame1", {opacity:1})	 
	tl.add("bars")
  tl.from(".top", {y:"-=100", opacity:0, duration:.5, stagger:.05}, "bars")
  tl.from(".bottom", {y:"+=100", opacity:0, duration:.5, stagger:.05}, "bars")



  tl.from(".ypy", {y:"+=150", opacity:0, duration:.25, stagger:.2}, "bars+=.2")

  tl.to(".ypy", { opacity:0, duration:.4 }, "+=1")


// return
  
  

  scaler(".screen_1_screen_only", pos[0], pos[1])
  scaler(".screen_2", pos[0], pos[1])

  tl.add("screen_1")
	tl.from(".screen_1_screen_only", {duration:.4, scale:0, ease:"back.out"}, "screen_1")
  tl.from(".t0_a", {opacity:0, duration:.3}, "screen_1")


  

  tl.add("screen_change", `+=${READ.t0}`)
  for(let i=0;i<50;i++){
  	tl.add(copyShape(posX, posY), "screen_change")
  }

  tl.to(".t0_a", {opacity:0, duration:.3}, "screen_change")
  tl.from(".t0_b", {opacity:0, duration:.3}, "screen_change")


  tl.to(".shapes", {opacity:0, duration:1}, "screen_change+=.5")
  

  tl.from(".screen_2", {duration:.4, scale:0, ease:"back.out"}, "screen_change")
  tl.to(".screen_1", {duration:.3, scale:0, ease:"back.out"}, "screen_change")

  tl.to([".screen", ".t0_b"], {duration:.3, opacity:0})

  
	tl.from(".t1", {opacity:0, duration:.3})
  

 

  tl.to(".t1", {opacity:0, duration:.3}, `+=${READ.t1}`)

  tl.add("end")
   
  
  tl.from(".end_text", {opacity:0, duration:.3})
  tl.from([".end_legal", ".end_cta"], {opacity:0, duration:.3})
  
  tl.add(logoGO())
  
	return tl
}

init({pos:[.73, .5]})