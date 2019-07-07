const { watch, series, src, dest } = require('gulp');
const less = require("gulp-less");

const gulp = require('gulp');
const sourcemaps = require('gulp-sourcemaps');
const imagemin = require('gulp-imagemin');

const browserify = require('browserify');
const stream = require('vinyl-source-stream');
const glob = require('glob');
const es = require('event-stream');
const rename = require('gulp-rename');

const rev = require('gulp-rev');
const revReplace = require('gulp-rev-replace');
const argv = require('yargs').argv;

const webserver = require('gulp-webserver');
const url = require('url');
const fs = require('fs');
const path = require('path');
const rootPath = process.cwd();

function css() {
    return src('./src/less/*.less')
          .pipe(less())
          .pipe(dest('dist/css'))
}
 
function script(done) {

	glob('./src/js/*.js', function(err, files){
		if(err) done(err);

        var tasks = files.map(function(entry) {
            return browserify({ entries: [entry] })
                .bundle()
                .pipe(stream(entry))
		        .pipe(rename({
	                dirname: ''
	            }))
                .pipe(gulp.dest('./dist/js'));
            });
        es.merge(tasks).on('end', done);

	});

    gulp.src(['./src/js/lib/base.js'])
        .pipe(gulp.dest('./dist/js'));

}

function server() {
  gulp.src('./dist')
    .pipe(webserver({
        port: 80,
        livereload: true,
        directoryListing: true,
        host:'0.0.0.0',
        proxies: [
            {
                source: '/local', 
                target: 'http://39.104.82.5:9091/pika-member-wx',
                options: {headers: {'Authorization': '123123'}}
            }
        ]
    }));

    // gulp.src('./dist')
    //     .pipe(webserver({
    //         livereload: true,
    //         directoryListing: {
    //             enable:true,
    //             path: './dist'
    //         },
    //         port: 8000,
    //         host:'127.0.0.1',
    //         proxies: [
    //             {
    //                 source: '/api', target: 'http://10.0.8.197:8080'
    //             }
    //         ],
    //         // middleware: function(req, res, next) {
    //         //     // var urlObj = url.parse(req.url, true),
    //         //     //     method = req.method;

    //         //     // if (urlObj.pathname.indexOf('/api/')>-1) {
    //         //     // var jsonPath = 'mock/data'+(urlObj.pathname).replace(/\//g, '_')+'.json';  
    //         //     // var data = fs.readFileSync(path.join(rootPath, jsonPath), {encoding: 'utf8'});
    //         //     //     data = JSON.parse(data);
    //         //     //     res.setHeader('Content-Type', 'application/json');
    //         //     //     res.end(JSON.stringify(data));
    //         //     // }
    //         //     next();
    //         // }
    //     }));

}

// function img() {
// 	    gulp.src('./src/img/*')
//         .pipe(imagemin())
//         .pipe(gulp.dest('./dist/img'))
// }

function watchTask () {

	watch('./src/less/*.less', css);

	watch(['./src/js/*.js', './src/js/lib/*.js', './src/js/tpl/*.js'],  script);

}


function dev(){
	server();
	watchTask();
}
// exports.img = img
exports.default = dev
