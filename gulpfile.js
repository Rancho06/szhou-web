"use strict"; // strict mode

/* modules */
let gulp = require('gulp'),
    gutil = require('gulp-util'),
    uglify = require('gulp-uglify'),
    coffee = require('gulp-coffee'),
    concat = require('gulp-concat'),
    sass = require('gulp-ruby-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    webserver = require('gulp-webserver');

/* source files */
let coffeeSources = './components/coffee/*.coffee',
    sassSources = ['./components/sass/style1.scss'],
    jsSources = './components/scripts/*.js';

/* tasks */

/* converts all .coffee into .js scripts */
gulp.task('coffee', function() {
	gulp.src(coffeeSources)
        .pipe(sourcemaps.init())
        .pipe(coffee({ bare : true }).on('error', gutil.log))
        .pipe(sourcemaps.write())
		.pipe(gulp.dest('components/scripts'));
});

/* converts all .sass into .css and then combines them to a single .css file */
gulp.task('sass', function() {
	return sass(sassSources, {
			sourcemap: true
		})
		.on('error', sass.logError)
		.pipe(sourcemaps.write())
		.pipe(concat('style.css'))
		.pipe(gulp.dest('builds/css'));
});

/* combines all .js scripts to a single uglified js file */
gulp.task('js', function() {
	gulp.src(jsSources)
		.pipe(uglify())
		.pipe(concat('script.js'))
		.pipe(gulp.dest('builds/js'));
});

/* start the express app */
gulp.task('express', function() {
	require('./server');
});

/* monitor the changes in source files */
gulp.task('watch', function() {
	gulp.watch(coffeeSources, ['coffee']);
	gulp.watch(sassSources, ['sass']);
	gulp.watch(jsSources, ['js']);
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
gulp.task('default', ['coffee', 'sass', 'js', 'express', 'webserver', 'watch']);


