var gulp            = require('gulp');
var notify          = require("gulp-notify");
var htmlmin         = require('gulp-htmlmin');
var replace         = require('gulp-replace');
var inlinesource    = require('gulp-inline-source');
var stripDebug      = require('gulp-strip-debug');
var rename          = require('gulp-rename');
var moment          = require('moment');
var ghtmlSrc        = require('gulp-html-src');
var zip           	= require('gulp-zip');




function zipBanner(projectName){  
   
    

    var entry = './docs/deploy/'+projectName;
    var stream =  gulp.src('./docs/deploy/'+projectName+'/**',  { base : "./docs/deploy" })
        .pipe(zip(projectName+'.zip'))
        .pipe(gulp.dest('./docs/zips'));
        return stream;   

}

module.exports = zipBanner;


