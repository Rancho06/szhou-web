"use strict"; // strict mode

/* modules */
let gulp = require('gulp'),
    gutil = require('gulp-util'),
    browserify = require('gulp-browserify'),
    concat = require('gulp-concat'),
    sass = require('gulp-ruby-sass'),
    webserver = require('gulp-webserver');

/* precompile mapping module */
let mapping = require('./precompile');

/* tasks */
/* converts all .sass into .css and then combines them to a single .css file */
gulp.task('css', function() {
    return sass(mapping.css.origin)
        .on('error', gutil.log)
        .pipe(concat(mapping.css.target))
        .pipe(gulp.dest(mapping.css.dir));
});

/* combines all .js scripts to a single uglified js file */
gulp.task('js', function() {
    gulp.src(mapping.js.origin)
        .on('error', gutil.log)
        .pipe(concat(mapping.js.target))
        .pipe(browserify())
        .pipe(gulp.dest(mapping.js.dir));
});

/* start the express app */
gulp.task('express', function() {
    require('./server');
});

/* monitor the changes in source files */
gulp.task('watch', function() {
    gulp.watch(mapping.css.src, ['css']);
    gulp.watch(mapping.js.src, ['js']);
});

/* start the webserver with livereload */
gulp.task('webserver', function() {
    gulp.src('./builds')
        .pipe(webserver({
            host: 'localhost',
            port: 3000,
            livereload: true,
            open: true,
        }));
});

/* the default task when running 'gulp' from command line */
gulp.task('default', ['css', 'js', 'express', 'webserver', 'watch']);


