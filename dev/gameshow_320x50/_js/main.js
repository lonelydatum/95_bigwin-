import {logoGO, read} from '../../_common/js/common.js'




const tl = new TimelineMax()
tl.from([".ypy_1", ".ypy_2", ".ypy_3"], {duration:.3, opacity:0, stagger:.3})





function init({ypy, device}){	
	const tl = new TimelineMax({onComplete:()=>{
		if(document.getElementById("legalBtn")){			
			TweenLite.set("#legalBtn", {display:"block"})
		}
	}})
	
	TweenLite.to(".hero_on", {duration:2, opacity:1, yoyo:true, repeat:0, repeatDelay:0, ease:"back.out"})

	TweenLite.to(".phone", {duration:.8, opacity:.6, yoyo:true, repeat:11, repeatDelay:0, ease:"back.out"})

	tl.set(".frame1", {opacity:1})	 
	tl.set(".end_device", {  opacity:0})
	
	

	tl.add(ypy)	

	tl.to(".ypy", {duration:.3, opacity:0}, "+=1")

	tl.add("t1", "+=.2")
	tl.from([".t1"], {duration:.3, y:"+=30", opacity:0}, "t1")
	tl.from([".device"], {duration:.5, opacity:0}, "t1")
	tl.to(".t1", {duration:.3, opacity:0}, `+=${read.t1}`)

	


	tl.add("t2")
 
	
	
	tl.from(".t2", {duration:.3, opacity:0}, "t2")
	tl.to(".t2", {duration:.3, opacity:0}, `+=${read.t2}`)
	

	// tl.to([  ".frame1"], {duration:.3, opacity:0} )


	
	tl.set(".frame2", {opacity:1}, "+=.3")

	
	tl.from(".end_url", {duration:.3, opacity:0}, "+=.3")
	tl.from(".end_ypy", {duration:.3, opacity:0}, "+=.3")
	tl.from(".end_cta", {duration:.3, opacity:0, y:"+=50", opacity:0}, "+=.3")

	tl.add(logoGO())
	return tl
}


init({ypy:tl})
