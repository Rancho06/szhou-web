"use strict";

let $ = require('jquery'),
	name = require('./script2');

$(".container").append(`Hello ${name}`);