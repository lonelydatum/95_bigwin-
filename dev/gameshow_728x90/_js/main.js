import {bannerSize, init} from '../../_common/js/common.js'


const tl = new TimelineMax()
tl.from([".ypy_1", ".ypy_2", ".ypy_3"], {duration:.3, opacity:0, stagger:.3})

init({ypy:tl})
