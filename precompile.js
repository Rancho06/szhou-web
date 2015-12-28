"use strict";

/* This module defines the path for precompiling the source */
let mapping = {
	css: {
		src: './components/sass/**/*.scss',
		origin: './components/sass/style.scss',
		target: 'style.css',
		dir: './builds/css'
	},
	js: {
		src: './components/scripts/**/*.js',
		origin: './components/scripts/script.js',
		target: 'script.js',
		dir: './builds/js'
	}
};

module.exports = mapping;