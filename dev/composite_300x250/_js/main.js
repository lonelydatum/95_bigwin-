import {init} from '../../_common/js/common.js'

const ypy = new TimelineMax()
ypy.from([".ypy_1", ".ypy_2", ".ypy_3"], {duration:.3, y:"-=200", stagger:.13})


const device = new TimelineMax()
device.to(".device", {duration:.3, x:216, y:109, scale:.45}, "t2")

init({ypy, device}, true)
