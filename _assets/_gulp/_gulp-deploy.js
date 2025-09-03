var gulp            = require('gulp');
var notify          = require("gulp-notify");
var htmlmin         = require('gulp-htmlmin');
var replace         = require('gulp-replace');
var inlinesource    = require('gulp-inline-source');
var stripDebug      = require('gulp-strip-debug');
var rename          = require('gulp-rename');
var moment          = require('moment');
var ghtmlSrc = require('gulp-html-src');
var zip           = require('gulp-zip');




function getImagePaths(projectName, cb){
    
    var images = []
    const imageStream = gulp.src('./dev/'+projectName+'/index.html')
        .pipe(
            ghtmlSrc({                 
                selector: 'img', 
                includeHtmlInOutput: false,
                getFileName:function(node){
                    var url = node.attr("src")
                    if(url){
                        url = url.replace("../_common", "dev/_common")
                        cb(url)    
                        return url
                    }else{
                         cb("")    
                        return ""
                    }
                    
                    // images.push(url)                    
                    
                }
            })
        )
}



function log_free(projectName){  
    const splited = projectName.split("_")
    
    
    const size = splited[splited.length-1]
    

    var images = []
    getImagePaths(projectName, function(url){        
        if(url.length>0){
            images.push(url)            
        }
    })
    
    
    

    var entry = './dev/'+projectName+'/index.html';
    var stream =  gulp.src(entry)
        // .pipe(replace("main.js", 'log-free.js'))
        .pipe(htmlmin({removeComments:true, collapseWhitespace:true, preserveLineBreaks:true}))
        .pipe(inlinesource({compress:true, svgAsImage:true}))
        .on('error', notify.onError({message:"<%= error.message %>", wait: false}))               
        .pipe(replace('data:image/svg+xml;utf8', 'data:image/svg+xml;charset=utf-8'))
        .pipe(replace('<script type="text/javascript" src="http://localhost:48626/takana.js"></script>', ''))
        .pipe(replace("takanaClient.run({host: 'localhost:48626'});", ''))
        .pipe(replace("../_common/images/"+size+"/", ''))
        .pipe(replace("<title>", '<title>Created: '+moment().format('MMM D, h:mm')))
        .on("end", function(){
            // for(var i=0;i<images.length;i++){     
            //     console.log(images[i]);
            //     gulp.src(images[i]).pipe(gulp.dest('./docs/deploy/'+projectName))               
            // }
        })
        .pipe(gulp.dest('./docs/deploy/'+projectName))     
        // .pipe(zip(projectName+'.zip'))
        // .pipe(gulp.dest('./docs/zips'));

        return stream;   

}

module.exports = log_free;

