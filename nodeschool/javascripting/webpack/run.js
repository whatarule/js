/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	
	/*
	    require("./modules.js")    ;

	    var run = require("introduction.js")   ;
	    var run = require("variables.js")   ;
	    var run = require("strings.js")   ;
	    var run = require("string-length.js")   ;
	    var run = require("rivising-strings.js")   ;
	    var run = require("numbers.js")   ;
	    var run = require("number-to-string.js")   ;
	    var run = require("rounding-numbers.js")   ;
	    var run = require("if-statement.js")   ;
	*/
	    module.exports = __webpack_require__(1)   ;




/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	
	var _ = __webpack_require__(2)   ;
	var _r = __webpack_require__(3)   ;
	var _i = __webpack_require__(4)   ;

	// var Container = require("./module/container.js")  ;

	var plus = _r.curry(function(x,y){
	    return x + y    ;
	})   ;
	/*
	    var total = 111 ;
	    var total = _i.Range().take(10) ;
	    console.log(total)  ;
	    var total = _.map([1,2,3,4,5,6,7,8,9,10],plus) ;
	    var total = _.reduce([1,2,3,4,5,6,7,8,9,10],plus) ;
	    var total = _.map(_i.Range().take(10).toArray(),plus) ;
	    var total = _.reduce(_i.Range().take(10).toArray(),plus) ;
	    var total = _i.Range().take(10).toArray().reduce(plus) ;
	*/
	    var total = _i.Range().take(10).toArray().reduce(plus) ;
	/*
	    var total = Container(_.reduce).ap(_i.Range).chain(_i.take).ap(10).chain(toArray).ap(plus)   ;
	*/
	    console.log(total)  ;




/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = _;

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = _r;

/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = _i;

/***/ }
/******/ ]);